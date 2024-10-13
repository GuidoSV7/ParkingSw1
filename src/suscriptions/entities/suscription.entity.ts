import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('suscriptions')
export class Suscription {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    price: number;

    @Column('timestamp')
    date: Date;


}
