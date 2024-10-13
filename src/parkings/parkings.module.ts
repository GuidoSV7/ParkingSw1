import { Module } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { ParkingsController } from './parkings.controller';
import { Parking } from './entities/parking.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from 'src/users/entities/manager.entity';
import { Lot } from 'src/lots/entities/lot.entity';

@Module({
  controllers: [ParkingsController],
  providers: [ParkingsService],
  imports: [TypeOrmModule.forFeature([Parking, Manager, Lot ])],
  exports: [ParkingsService]
})
export class ParkingsModule {}
