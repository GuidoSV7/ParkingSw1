import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { ParkingsModule } from './parkings/parkings.module';
import { LotsModule } from './lots/lots.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

  

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    UsersModule,


    SuscriptionsModule,


    PaymentsModule,


    ParkingsModule,


    LotsModule,


    TicketsModule,



  ],
})
export class AppModule {}