import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { Parking } from 'src/parkings/entities/parking.entity';
import { NotificationfcmService } from 'src/notificationfcm/notificationfcm.service';
import { Client } from 'src/users/entities/client.entity';

@Injectable()
export class AnnouncementsService {
  private readonly logger = new Logger('announcementsService');
  

  constructor(

   

    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,

    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,


    private readonly notificationfcmService: NotificationfcmService,


    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createAnnouncementDto: CreateAnnouncementDto) {
    try {
      const {idParking,...AnnouncementDetails} = createAnnouncementDto;
      const announcement= this.announcementRepository.create({
        ...AnnouncementDetails,
        idParking: { id: idParking }
      });

     
     // Get tokens from clients who favorited this parking
     const tokensResult = await this.clientRepository
     .createQueryBuilder('client')
     .leftJoinAndSelect('client.favorites', 'favorite')
     .where('favorite.idParking = :parkingId', { parkingId: idParking })
     .andWhere('client.tokenFCM IS NOT NULL')
     .getMany();

   const tokens = tokensResult.map(client => client.tokenFCM).filter(token => token);

   // Send notifications if there are tokens
   if (tokens.length > 0) {
     await this.notificationfcmService.sendNotificationToMultipleTokens({
       tokens,
       title: announcement.title,
       body: announcement.description,
     });
   }

      return await this.announcementRepository.save(announcement);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.announcementRepository.find({
    });
    
  }

  async findOne(id : string) {

    let announcement: Announcement;

      const queryBuilder = this.announcementRepository.createQueryBuilder();
      announcement= await queryBuilder
        .where('id =:id ',{
          id:id,
        })
        .getOne();

    if(!announcement){
      throw new NotFoundException( `Announcement con id ${id} no encontrada`);
    }

    return announcement;
    
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // First, find the parking if idParking is provided
      let parking: Parking | null = null;
      if (updateAnnouncementDto.idParking) {
        parking = await this.parkingRepository.findOne({
          where: { id: updateAnnouncementDto.idParking },
        });
        
        if (!parking) {
          throw new NotFoundException(
            `Parking con id ${updateAnnouncementDto.idParking} no encontrado`,
          );
        }
      }

      // Prepare the announcement data for update
      const toUpdate = {
        ...updateAnnouncementDto,
        idParking: parking, // Replace idParking string with the actual parking entity
      };
      delete toUpdate.idParking; // Remove the string idParking from DTO

      // Preload the announcement with the updates
      const announcement = await this.announcementRepository.preload({
        id,
        ...toUpdate,
      });

      if (!announcement) {
        throw new NotFoundException(`Announcement con id ${id} no encontrado`);
      }

      // Save the updated announcement
      await queryRunner.manager.save(announcement);
      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar los datos del Announcement',
      );
    } finally {
      await queryRunner.release();
    }
  }





  async remove(id: string) {

    const announcement= await this.findOne(id);

    await this.announcementRepository.remove(announcement);

    return { mensaje: `La announcement con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllAnnouncements(){
    const query = this.announcementRepository.createQueryBuilder('announcement');

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
