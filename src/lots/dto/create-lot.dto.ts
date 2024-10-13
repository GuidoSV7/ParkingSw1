import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLotDto {

    @ApiProperty({
        description: 'Nombre del lote',
        example: 'Lot A1',
      })
      @IsString()
      name: string;
    
      @ApiProperty({
        description: 'Disponibilidad del lote',
        example: true,
        default: true,
      })
      @IsBoolean()
      isAvailable: boolean;

      @ApiProperty({
        description: 'Piso al que pertenece el lote',
        example: 1,
      })
      @IsNumber()
      floor: number;
    
      @ApiProperty({
        description: 'ID del parking al que pertenece el lote',
        example: 'uuid-of-parking',
        nullable: false
      })
      @IsString()
      idParking: string;
    


}
