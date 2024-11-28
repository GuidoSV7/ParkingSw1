import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from 'src/parkings/entities/parking.entity';
import { Offer } from './entities/offer.entity';
import { Client } from 'src/users/entities/client.entity';
import { NotificationfcmModule } from 'src/notificationfcm/notificationfcm.module';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [TypeOrmModule.forFeature([Parking, Offer, Client]), NotificationfcmModule],
})
export class OffersModule {}
