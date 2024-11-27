import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLotDto {

    @ApiProperty({
        description: 'Numero del Lot',
        example: '53',
      })
      @IsNumber()
      number: number;
    

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
