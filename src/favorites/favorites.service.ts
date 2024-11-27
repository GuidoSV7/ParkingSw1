import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

import { Parking } from 'src/parkings/entities/parking.entity';
import { Client } from 'src/users/entities/client.entity';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger('favoritesService');
  

  constructor(

   

    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,
 
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      const {idClient, idParking,...FavoriteDetails} = createFavoriteDto;

      const client = await this.clientRepository.findOne({ where: { id: idClient } });
      const parking = await this.parkingRepository.findOne({ where: { id: idParking } });

      const favorite = this.favoriteRepository.create({
        ...FavoriteDetails,
        idClient:client,
        idParking: parking,

      });

      return await this.favoriteRepository.save(favorite);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.favoriteRepository.find({

    });
    
  }

  async findOne(id : string) {

    let favorite: Favorite;

      const queryBuilder = this.favoriteRepository.createQueryBuilder();
      favorite= await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!favorite){
      throw new NotFoundException( `Favorite con id ${id} no encontrada`);
    }

    return favorite;
    
  }

  // async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {

  //   const {...toUpdate} = updateFavoriteDto;

  //   const favorite = await this.favoriteRepository.preload({ id, ...toUpdate});

  //   if(!favorite){
  //     throw new NotFoundException(`Favorite con id ${id} no encontrada`);
  //   }

  //   //Create Query Runner
  //   const queryRunner = this.dataSource.createQueryRunner();
    
  //   await queryRunner.connect();

  //   await queryRunner.startTransaction();

  //   try{



  //     await queryRunner.manager.save(favorite);

  //     await queryRunner.commitTransaction();
  //     await queryRunner.release();

  //     return this.findOne(id);

  //   } catch{
      
  //     await queryRunner.rollbackTransaction();
  //     await queryRunner.release();

  //     throw new InternalServerErrorException('Error al actualizar los datos de la Favorite');
  //   }
  
    
  // }




  async remove(id: string) {

    const favorite= await this.findOne(id);

    await this.favoriteRepository.remove(favorite);

    return { mensaje: `La favorite con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllFavorites(){
    const query = this.favoriteRepository.createQueryBuilder('favorite');

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
