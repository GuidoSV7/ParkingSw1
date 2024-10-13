import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    number: number;

    @Column('text',{
        default: 'avalible'
    })
    state: string;

    @Column('int')
    duration: number;

}
