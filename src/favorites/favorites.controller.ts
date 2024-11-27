import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Favorite } from './entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
 
  @Post()
  @ApiResponse({status:201, description:'Favorite Creado exitosamente', type: Favorite})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.favoritesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string ,
  //       @Body() updateFavoriteDto: UpdateFavoriteDto) 
  //       {
  //   return this.favoritesService.update(id, updateFavoriteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
