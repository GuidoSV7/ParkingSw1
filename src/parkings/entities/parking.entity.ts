import { Lot } from "src/lots/entities/lot.entity";
import { Manager } from "src/users/entities/manager.entity";
import { ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";

@Entity('parkings')
export class Parking {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    
    @Column('text')
    photoUrl: string;

    @ManyToOne(() => Manager, (manager) => manager.parkings,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'idManager' ,}) 
    manager: Manager;

    @OneToMany(() => Lot, (lot) => lot.parking,{onDelete: 'CASCADE'})
    lots: Lot[];
}
