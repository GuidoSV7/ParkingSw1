
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Parking } from "../../parkings/entities/parking.entity";
import { Entity, OneToMany } from "typeorm";

@Entity('managers')
export class Manager extends User {

    @ApiProperty({
        type: () => Parking,
        isArray: true,
        description: 'La lista de parkings asociados a este manager.',
        example: [{id: 1, nombre: 'Parking 001 los Lotes', photoUrl: 'http://foto.com'}]
  
      })
    //parkings
    @OneToMany(() => Parking, (parkings) => parkings.manager,{eager:true})
    parkings: Parking[]

}
