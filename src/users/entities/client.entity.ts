

import { User } from "src/auth/entities/user.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('clients')
export class Client extends User {

    @OneToMany(() => Favorite, (favorite) => favorite.idClient)
    favorites: Favorite[];

    @OneToMany(() => Ticket, (ticket) => ticket.idClient)
    tickets: Ticket[];

}
