import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Parking } from 'src/parkings/entities/parking.entity';
import { Client } from 'src/users/entities/client.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idClient' })
  idClient: Client;

  @ManyToOne(() => Parking, (parking) => parking.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idParking' })
  idParking: Parking;
}