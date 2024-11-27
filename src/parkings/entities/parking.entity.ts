import { Announcement } from "src/announcements/entities/announcement.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Lot } from "src/lots/entities/lot.entity";
import { Offer } from "src/offers/entities/offer.entity";
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

    @OneToMany(() => Favorite, (favorite) => favorite.idParking)
    favorites: Favorite[];

    @OneToMany(() => Offer, (offer) => offer.idParking)
    offers: Offer[];

    @OneToMany(() => Announcement, announcement => announcement.idParking)
    announcements: Announcement[];
}
