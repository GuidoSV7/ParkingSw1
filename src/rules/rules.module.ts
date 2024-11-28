import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { NotificationfcmModule } from 'src/notificationfcm/notificationfcm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { Parking } from 'src/parkings/entities/parking.entity';
import { Client } from 'src/users/entities/client.entity';
import { Rule } from 'src/rules/entities/rule.entity';

@Module({
  controllers: [RulesController],
  providers: [RulesService],
  imports: [TypeOrmModule.forFeature([Parking, Offer, Client, Rule]), NotificationfcmModule],
})
export class RulesModule {}
