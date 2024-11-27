import { Parking } from 'src/parkings/entities/parking.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';


@Entity()
export class Announcement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Parking, parking => parking.announcements)
    @JoinColumn({ name: 'idParking' })
    idParking: Parking;


}