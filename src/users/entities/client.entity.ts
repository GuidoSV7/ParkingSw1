

import { User } from "src/auth/entities/user.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('clients')
export class Client extends User {

    @OneToMany(() => Favorite, (favorite) => favorite.idClient)
    favorites: Favorite[];

}
