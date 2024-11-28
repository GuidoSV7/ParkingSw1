import { Module } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { ParkingsController } from './parkings.controller';
import { Parking } from './entities/parking.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/users/entities/manager.entity';

import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Announcement } from 'src/announcements/entities/announcement.entity';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  controllers: [ParkingsController],
  providers: [ParkingsService],
  imports: [TypeOrmModule.forFeature([Parking, Manager, Favorite, Offer, Announcement, Rule])],
  exports: [ParkingsService]
})
export class ParkingsModule {}
