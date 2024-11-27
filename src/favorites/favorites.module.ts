import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Parking } from 'src/parkings/entities/parking.entity';
import { Client } from 'src/users/entities/client.entity';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TypeOrmModule.forFeature([Parking, Client, Favorite ])],
})
export class FavoritesModule {}
