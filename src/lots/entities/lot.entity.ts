import { Parking } from "src/parkings/entities/parking.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('lots')
export class Lot {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('boolean', { default: true })
    isAvailable: boolean;

    @ManyToOne(() => Parking, (parking) => parking.lots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idParking' })
    parking: Parking;

}
