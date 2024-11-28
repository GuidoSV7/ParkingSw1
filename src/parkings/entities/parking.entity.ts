import { Announcement } from "src/announcements/entities/announcement.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";

import { Offer } from "src/offers/entities/offer.entity";
import { Rule } from "src/rules/entities/rule.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Manager } from "src/users/entities/manager.entity";
import { ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn, Entity, OneToMany, OneToOne } from "typeorm";

@Entity('parkings')
export class Parking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: true })
    name: string;

    @Column('text', { nullable: true })
    photoUrl: string;

    @Column('int', { nullable: true })
    numberOfSpaces: number;

    @Column('text', { nullable: true })
    openingHours: string;

    @Column('text', { unique: true, nullable: true })
    email: string;

    @Column('text', { select: false, nullable: true })
    password: string;

    @Column('text', { nullable: true })
    cellphone: string;

    @Column('text', { nullable: true })
    direction: string;

    @Column('text', { nullable: true })
    coordinates: string;

    @Column('text', { nullable: true })
    urlGoogleMaps: string;


    @OneToOne(() => Manager, (manager) => manager.parking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idManager' })
    manager: Manager;

    @OneToMany(() => Favorite, (favorite) => favorite.idParking)
    favorites: Favorite[];

    @OneToMany(() => Offer, (offer) => offer.idParking)
    offers: Offer[];

    @OneToMany(() => Rule, (rule) => rule.idParking)
    rules: Rule[];

    @OneToMany(() => Announcement, announcement => announcement.idParking)
    announcements: Announcement[];

    @OneToMany(() => Ticket, (ticket) => ticket.idParking)
    tickets: Ticket[];
}