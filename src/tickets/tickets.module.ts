import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Lot } from 'src/lots/entities/lot.entity';
import { Client } from 'src/users/entities/client.entity';
import { Parking } from 'src/parkings/entities/parking.entity';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [TypeOrmModule.forFeature([Ticket, Client, Parking ])],
  exports: [TicketsService]
})
export class TicketsModule {}
