import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Lot } from './entities/lot.entity';

@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

 
  @Post()
  @ApiResponse({status:201, description:'Lot Creado exitosamente', type: Lot})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotsService.create(createLotDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.lotsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string ,
        @Body() updateLotDto: UpdateLotDto) 
        {
    return this.lotsService.update(id, updateLotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotsService.remove(id);
  }
}
