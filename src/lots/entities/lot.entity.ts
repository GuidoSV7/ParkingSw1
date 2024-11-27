import { Parking } from "src/parkings/entities/parking.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('lots')
export class Lot {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    number: number;

    @Column('boolean', { default: true })
    isAvailable: boolean;




}
