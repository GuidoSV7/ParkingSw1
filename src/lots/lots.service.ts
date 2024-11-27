import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Lot } from './entities/lot.entity';

@Injectable()
export class LotsService {
  private readonly logger = new Logger('lotsService');
  

  constructor(

   

    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createLotDto: CreateLotDto) {
    try {
      const {idParking,...LotDetails} = createLotDto;
      const lot= this.lotRepository.create({
        ...LotDetails
      });

      return await this.lotRepository.save(lot);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.lotRepository.find({
      where: { isAvailable: true },
    });
    
  }

  async findOne(id : string) {

    let lot: Lot;

      const queryBuilder = this.lotRepository.createQueryBuilder();
      lot= await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!lot){
      throw new NotFoundException( `Lot con id ${id} no encontrada`);
    }

    return lot;
    
  }

  async update(id: string, updateLotDto: UpdateLotDto) {

    const {idParking,...toUpdate} = updateLotDto;

    const lot = await this.lotRepository.preload({ id, ...toUpdate});

    if(!lot){
      throw new NotFoundException(`Lot con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(lot);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Lot');
    }
  
    
  }




  async remove(id: string) {

    const lot= await this.findOne(id);

    await this.lotRepository.remove(lot);

    return { mensaje: `La lot con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllLots(){
    const query = this.lotRepository.createQueryBuilder('lot');

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
