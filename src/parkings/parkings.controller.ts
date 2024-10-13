import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Parking } from './entities/parking.entity';

@Controller('parkings')
export class ParkingsController {
  constructor(private readonly parkingsService: ParkingsService) {}

 
  @Post()
  @ApiResponse({status:201, description:'Parking Creado exitosamente', type: Parking})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingsService.create(createParkingDto);
  }

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
