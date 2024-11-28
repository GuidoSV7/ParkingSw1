
import { Lot } from "src/lots/entities/lot.entity";
import { Parking } from "src/parkings/entities/parking.entity";
import { Client } from "src/users/entities/client.entity";
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne, ManyToOne } from "typeorm";

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp', { nullable: true })
  entrance: String;

  @Column('timestamp', { nullable: true })
  exit: String;

  @Column('text', {
    default: 'available',
  })
  state: string;

  @Column('float', { nullable: true })
  charge: number;

  @Column('text', { nullable: true })
  extra: string;

  @ManyToOne(() => Client, (client) => client.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idClient' })
  idClient: Client;

  @ManyToOne(() => Parking, (parking) => parking.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idParking' })
  idParking: Parking;

  

}
