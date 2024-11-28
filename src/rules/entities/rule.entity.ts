import { Parking } from "src/parkings/entities/parking.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity('rules')
export class Rule {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column()
    description: string;
  
  
    @ManyToOne(() => Parking, (parking) => parking.offers)
    @JoinColumn({ name: 'idParking' })
    idParking: Parking;
}
