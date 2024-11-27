import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParkingsService } from './parkings.service';

import { UpdateParkingDto } from './dto/update-parking.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Parking } from './entities/parking.entity';

@Controller('parkings')
export class ParkingsController {
  constructor(private readonly parkingsService: ParkingsService) {}

 


  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.parkingsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string ,
        @Body() updateParkingDto: UpdateParkingDto) 
        {
    return this.parkingsService.update(id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingsService.remove(id);
  }
}
