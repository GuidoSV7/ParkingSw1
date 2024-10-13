
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity } from "typeorm";

@Entity('clients')
export class Client extends User {

    @ApiProperty({
        example: true,
        description: 'Estado del Manager',
        minLength: 1
    })
    @Column('boolean', { default: false})
    isSuscribed: boolean;

}
