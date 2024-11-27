import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Client } from 'src/users/entities/client.entity';
import { Manager } from 'src/users/entities/manager.entity';
import { Parking } from 'src/parkings/entities/parking.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      // Create and save the user first
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      const savedUser = await this.userRepository.save(user);

      if (savedUser.rol === 'client') {
        await this.clientRepository.save(savedUser);
      }

      if (savedUser.rol === 'manager') {
        // Save the manager
        const savedManager = await this.managerRepository.save(savedUser);
        
        // Create and save the parking with correct property name 'manager'
        const parking = this.parkingRepository.create({
          name: savedUser.name,
          email: savedUser.email,
          password: savedUser.password,
          cellphone: savedUser.cellphone,
          manager: savedManager  // Using manager instead of idManager to match entity
        });
        await this.parkingRepository.save(parking);
      }

      // Remove password from response
       // Remove password from response
      const { password: _, ...userWithoutPassword } = savedUser;

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: savedUser.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    // First find user with basic info + role
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, rol: true, id: true }
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    // If user is a manager, get associated parking data
    let parkingData = null;
    if (user.rol === 'manager') {
      parkingData = await this.parkingRepository.findOne({
        where: {
          manager: {
            id: user.id
          }
        },
        select: {
          id: true,
          name: true,
          photoUrl: true,
          numberOfSpaces: true,
          openingHours: true,
          email: true,
          cellphone: true,
          direction: true,
          coordinates: true,
          urlGoogleMaps: true,
          rules: true
        }
      });
    }

    // Remove password from user data
    const { password: _, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id }),
      parking: parkingData
    };
  }

  async checkAuthStatus(user: User) {
    // If user is a manager, get associated parking data
    let parkingData = null;
    if (user.rol === 'manager') {
      parkingData = await this.parkingRepository.findOne({
        where: {
          manager: {
            id: user.id
          }
        },
        select: {
          id: true,
          name: true,
          photoUrl: true,
          numberOfSpaces: true,
          openingHours: true,
          email: true,
          cellphone: true,
          direction: true,
          coordinates: true,
          urlGoogleMaps: true,
          rules: true
        }
      });
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
      parking: parkingData
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}