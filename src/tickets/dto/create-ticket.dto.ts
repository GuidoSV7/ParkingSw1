import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({
        description: 'Numero del Ticket'
    })
    @IsNumber()
    number: number;

    @ApiProperty({
        description: 'Duracion del Ticket'
    })
    @IsNumber()
    duration: number;


}
