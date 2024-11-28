import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NotificationfcmService } from 'src/notificationfcm/notificationfcm.service';
import { Parking } from 'src/parkings/entities/parking.entity';
import { Repository, DataSource } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Client } from 'src/users/entities/client.entity';

@Injectable()
export class OffersService {
  private readonly logger = new Logger('offersService');
  

  constructor(

   

    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,


    private readonly notificationfcmService: NotificationfcmService,


    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createOfferDto: CreateOfferDto) {
    try {
      const {idParking,...OfferDetails} = createOfferDto;
      const offer= this.offerRepository.create({
        ...OfferDetails,
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
  //      title: offer.title,
  //      body: offer.description,
  //    });
  //  }

      return await this.offerRepository.save(offer);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.offerRepository.find({
    });
    
  }

  async findOne(id: string) {
    const offer = await this.offerRepository.findOne({
      where: { id }    });

    if (!offer) {
      throw new NotFoundException(`Offer con id ${id} no encontrada`);
    }

    return offer;
  }
  async update(id: string, updateOfferDto: UpdateOfferDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First, find the parking if idParking is provided
      let parking: Parking | null = null;
      if (updateOfferDto.idParking) {
        parking = await this.parkingRepository.findOne({
          where: { id: updateOfferDto.idParking },
        });
        
        if (!parking) {
          throw new NotFoundException(
            `Parking con id ${updateOfferDto.idParking} no encontrado`,
          );
        }
      }

      // Prepare the offer data for update
      const toUpdate = {
        ...updateOfferDto,
        parking: parking, // Replace idParking with the actual parking entity
      };
      delete toUpdate.idParking; // Remove idParking as we're using the parking relation

      // Preload the offer with the updates
      const offer = await this.offerRepository.preload({
        id,
        ...toUpdate,
        idParking: parking ? { id: parking.id } : undefined,
      });

      if (!offer) {
        throw new NotFoundException(`Offer con id ${id} no encontrada`);
      }

      // Save the updated offer
      await queryRunner.manager.save(offer);
      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar los datos de la Offer',
      );
    } finally {
      await queryRunner.release();
    }
  }




  async remove(id: string) {

    const offer= await this.findOne(id);

    await this.offerRepository.remove(offer);

    return { mensaje: `La offer con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllOffers(){
    const query = this.offerRepository.createQueryBuilder('offer');

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
