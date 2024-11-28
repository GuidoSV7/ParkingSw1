import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NotificationfcmService } from 'src/notificationfcm/notificationfcm.service';
import { Parking } from 'src/parkings/entities/parking.entity';
import { Repository, DataSource } from 'typeorm';
import { Rule } from './entities/rule.entity';
import { Client } from 'src/users/entities/client.entity';

@Injectable()
export class RulesService {

  private readonly logger = new Logger('rulesService');

  constructor(

   

    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,

    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,


    private readonly notificationfcmService: NotificationfcmService,


    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createRuleDto: CreateRuleDto) {
    try {
      const {idParking,...RuleDetails} = createRuleDto;
      const rule= this.ruleRepository.create({
        ...RuleDetails,
        idParking: { id: idParking }
      });

     
  //    // Get tokens from clients who favorited this parking
  //    const tokensResult = await this.clientRepository
  //    .createQueryBuilder('client')
  //    .leftJoinAndSelect('client.favorites', 'favorite')
  //    .where('favorite.idParking = :parkingId', { parkingId: idParking })
  //    .andWhere('client.tokenFCM IS NOT NULL')
  //    .getMany();

  //  const tokens = tokensResult.map(client => client.tokenFCM).filter(token => token);

  //  // Send notifications if there are tokens
  //  if (tokens.length > 0) {
  //    await this.notificationfcmService.sendNotificationToMultipleTokens({
  //      tokens,
  //      title: rule.title,
  //      body: rule.description,
  //    });
  //  }

      return await this.ruleRepository.save(rule);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.ruleRepository.find({
    });
    
  }

  async findOne(id: string) {
    const rule = await this.ruleRepository.findOne({
      where: { id },
      relations: ['parking'],
    });

    if (!rule) {
      throw new NotFoundException(`Rule con id ${id} no encontrada`);
    }

    return rule;
  }
  async update(id: string, updateRuleDto: UpdateRuleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First, find the parking if idParking is provided
      let parking: Parking | null = null;
      if (updateRuleDto.idParking) {
        parking = await this.parkingRepository.findOne({
          where: { id: updateRuleDto.idParking },
        });
        
        if (!parking) {
          throw new NotFoundException(
            `Parking con id ${updateRuleDto.idParking} no encontrado`,
          );
        }
      }

      // Prepare the rule data for update
      const toUpdate = {
        ...updateRuleDto,
        parking: parking, // Replace idParking with the actual parking entity
      };
      delete toUpdate.idParking; // Remove idParking as we're using the parking relation

      // Preload the rule with the updates
      const rule = await this.ruleRepository.preload({
        id,
        ...toUpdate,
        idParking: parking ? { id: parking.id } : undefined,
      });

      if (!rule) {
        throw new NotFoundException(`Rule con id ${id} no encontrada`);
      }

      // Save the updated rule
      await queryRunner.manager.save(rule);
      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar los datos de la Rule',
      );
    } finally {
      await queryRunner.release();
    }
  }




  async remove(id: string) {

    const rule= await this.findOne(id);

    await this.ruleRepository.remove(rule);

    return { mensaje: `La rule con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllRules(){
    const query = this.ruleRepository.createQueryBuilder('rule');

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
