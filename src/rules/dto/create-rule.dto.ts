import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateRuleDto {
    @ApiProperty({
        description: 'Título de la oferta',
        example: 'Descuento de verano',
      })
      @IsString()
      title: string;
    
      @ApiProperty({
        description: 'Descripción de la oferta',
        example: 'Descuento del 20% en estacionamiento durante el verano',
      })
      @IsString()
      description: string;
    
    
      @ApiProperty({
        description: 'ID del parking al que pertenece la oferta',
        example: 'uuid-of-parking',
      })
      @IsUUID()
      idParking: string;
}
