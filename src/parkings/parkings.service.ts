import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingsService {
  private readonly logger = new Logger('parkingsService');
  

  constructor(

   

    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createParkingDto: CreateParkingDto) {
    try {

      const {idManager,...ParkingDetails} = createParkingDto;
      const parking= this.parkingRepository.create({
        ...ParkingDetails,
        manager: { id: idManager }
      });

      return await this.parkingRepository.save(parking);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.parkingRepository.find({
      relations: ['lots'],

    });
    
  }

  async findOne(id : string) {

    let parking: Parking;

      const queryBuilder = this.parkingRepository.createQueryBuilder('parking');
      parking= await queryBuilder
        .where('parking.id =:id ',{
          id:id,
        })
        .leftJoinAndSelect("parking.lots", "Lot") 
        .getOne();

    if(!parking){
      throw new NotFoundException( `Parking con id ${id} no encontrada`);
    }

    return parking;
    
  }

  async update(id: string, updateParkingDto: UpdateParkingDto) {

    const {idManager,...toUpdate} = updateParkingDto;

    const parking = await this.parkingRepository.preload({ id, ...toUpdate, manager: { id: idManager }});

    if(!parking){
      throw new NotFoundException(`Parking con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(parking);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Parking');
    }
  
    
  }




  async remove(id: string) {

    const parking= await this.findOne(id);

    await this.parkingRepository.remove(parking);

    return { mensaje: `La parking con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllParkings(){
    const query = this.parkingRepository.createQueryBuilder('parking');

    try{
      return await query
       .delete()
       .where({})
       .execute(); 



    } catch(error){
      this.logger.error(error.message);
      return error.message;
    }
  }
}
