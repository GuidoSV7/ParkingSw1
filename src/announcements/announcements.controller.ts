import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Announcement } from './entities/announcement.entity';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

 
  @Post()
  @ApiResponse({status:201, description:'Announcement Creado exitosamente', type: Announcement})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.announcementsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string ,
  //       @Body() updateAnnouncementDto: UpdateAnnouncementDto) 
  //       {
  //   return this.announcementsService.update(id, updateAnnouncementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
