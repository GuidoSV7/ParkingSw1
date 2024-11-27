import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Parking } from 'src/parkings/entities/parking.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column('float')
  discount: number;

  @Column('timestamp')
  time: Date;

  @ManyToOne(() => Parking, (parking) => parking.offers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idParking' })
  idParking: Parking;


}