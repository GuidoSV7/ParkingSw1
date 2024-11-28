import { Parking } from 'src/parkings/entities/parking.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column('float')
  discount: number;

  @Column()
  time: string;

  @ManyToOne(() => Parking, (parking) => parking.offers)
  @JoinColumn({ name: 'idParking' })
  idParking: Parking;
}