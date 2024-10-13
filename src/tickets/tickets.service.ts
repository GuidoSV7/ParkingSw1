import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository, DataSource } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger('ticketsService');
  

  constructor(

   

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    
    
    private readonly dataSource: DataSource,
  ){}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const {...TicketDetails} = createTicketDto;
      const ticket= this.ticketRepository.create({
        ...TicketDetails
      });

      return await this.ticketRepository.save(ticket);
      
    } catch (error) {
      
      this.logger.error(error.message);
      return error.message;
    }
  }

  findAll(paginationDto:PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;

    return this.ticketRepository.find({

    });
    
  }

  async findOne(id : string) {

    let ticket: Ticket;

      const queryBuilder = this.ticketRepository.createQueryBuilder('ticket');
      ticket= await queryBuilder
        .where('ticket.id =:id ',{
          id:id,
        })

        .getOne();

    if(!ticket){
      throw new NotFoundException( `Ticket con id ${id} no encontrada`);
    }

    return ticket;
    
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {

    const {...toUpdate} = updateTicketDto;

    const ticket = await this.ticketRepository.preload({ id, ...toUpdate});

    if(!ticket){
      throw new NotFoundException(`Ticket con id ${id} no encontrada`);
    }

    //Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try{



      await queryRunner.manager.save(ticket);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);

    } catch{
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new InternalServerErrorException('Error al actualizar los datos de la Ticket');
    }
  
    
  }




  async remove(id: string) {

    const ticket= await this.findOne(id);

    await this.ticketRepository.remove(ticket);

    return { mensaje: `La ticket con id ${id} se eliminó exitosamente.` };

  }

  async deleteAllTickets(){
    const query = this.ticketRepository.createQueryBuilder('ticket');

    try{
      return await query
       .delete()
       .where({})
       .execute(); 



    } catch(error){
      this.logger.error(error.message);
      return error.message;
    }
  }


  async updateTicketAttribute(ticketId: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Cambiar el atributo del ticket
    ticket.state = 'escaneado';
    return this.ticketRepository.save(ticket);
  }

}