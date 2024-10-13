import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Ticket } from './entities/ticket.entity';
import { Request, Response } from 'express';

var QRCode = require('qrcode')

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiResponse({status:201, description:'Ticket Creado exitosamente', type: Ticket})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.ticketsService.findAll(paginationDto);
  }

  @Get('generateQr/:ticketId')
  async generateQr(@Param('ticketId') ticketId: string, @Res() res: Response) {
    const url = `http://localhost:3000/api/tickets/scanQr/${ticketId}`;
    const qrCode = await QRCode.toDataURL(url);
    res.send(`<img src="${qrCode}" />`);
  }

  @Get('scanQr/:ticketId')
  async scanQr(@Param('ticketId') ticketId: string) {
    return this.ticketsService.updateTicketAttribute(ticketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string ,
        @Body() updateTicketDto: UpdateTicketDto) 
        {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }

  
}
