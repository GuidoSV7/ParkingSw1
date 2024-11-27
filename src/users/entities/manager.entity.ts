
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Parking } from "../../parkings/entities/parking.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { IsBoolean } from "class-validator";

@Entity('managers')
export class Manager extends User {


  @ApiProperty({
    description: 'Si el manager esta suscrito o no.',
    example: false
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  IsSuscribed: boolean;

    @ApiProperty({
        type: () => Parking,
        isArray: true,
        description: 'La lista de parkings asociados a este manager.',
        example: [{id: 1, nombre: 'Parking 001 los Lotes', photoUrl: 'http://foto.com'}]
  
      })
    //parkings
    @OneToOne(() => Parking, (parking) => parking.manager)
    parking: Parking;

}
