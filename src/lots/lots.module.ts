import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';
import { Parking } from 'src/parkings/entities/parking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';

@Module({
  controllers: [LotsController],
  providers: [LotsService],
  imports: [TypeOrmModule.forFeature([Parking, Lot ])],
})
export class LotsModule {}
