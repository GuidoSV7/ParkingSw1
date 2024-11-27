import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({
        description: 'Fecha y hora de entrada',
        example: '2023-07-01T08:00:00Z',
      })
      @IsDate()
      entrance: Date;
    
      @ApiProperty({
        description: 'Fecha y hora de salida',
        example: '2023-07-01T10:00:00Z',
        required: false,
      })
      @IsOptional()
      @IsDate()
      exit?: Date;
    
      @ApiProperty({
        description: 'Estado del ticket',
        example: 'available',
      })
      @IsString()
      state: string;
    
      @ApiProperty({
        description: 'Cargo asociado al ticket',
        example: 50.0,
      })
      @IsNumber()
      charge: number;
    
      @ApiProperty({
        description: 'Información adicional',
        example: 'Información extra',
        required: false,
      })
      @IsOptional()
      @IsString()
      extra?: string;

   
}
