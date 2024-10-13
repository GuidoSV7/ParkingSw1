import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";
import { Column } from "typeorm";

export class CreateParkingDto {
    
    @ApiProperty({
        description: 'Nombre del Parking',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'https://www.la-razon.com/wp-content/uploads/2023/01/11/02/COLEGIOS-LA-PAZ-LORETO-COLEGIO-LORETTO.jpg',
        description: 'Foto de la Oficinal',
    })

    @IsString()
    photoUrl?: string;

    @ApiProperty({
        description: 'ID del manager dueño del Parking',
        nullable: false
    })
    @IsString()
    idManager: string;
}
