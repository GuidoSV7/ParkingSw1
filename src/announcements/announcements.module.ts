import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { Announcement } from './entities/announcement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from 'src/parkings/entities/parking.entity';
import { NotificationfcmModule } from 'src/notificationfcm/notificationfcm.module';
import { Client } from 'src/users/entities/client.entity';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  imports: [TypeOrmModule.forFeature([Parking, Announcement, Client ]),
  NotificationfcmModule
  ]

})
export class AnnouncementsModule {}
