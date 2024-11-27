import { Lot } from "src/lots/entities/lot.entity";
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('timestamp')
    entrance: Date;
  
    @Column('timestamp', { nullable: true })
    exit: Date;
  
    @Column('text', {
      default: 'available',
    })
    state: string;
  
    @Column('float')
    charge: number;
  
    @Column('text', { nullable: true })
    extra: string;
  

}
