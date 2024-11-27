import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Client } from './entities/client.entity';
import { Manager } from './entities/manager.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([User, Client, Manager, Favorite]),
    AuthModule
  ],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
