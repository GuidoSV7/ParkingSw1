import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTicketDto {
    @ApiProperty({
        description: 'Fecha y hora de entrada',
        example: '2023-07-01T08:00:00Z',
      })
      @IsString()
      entrance: String;
    
      @ApiProperty({
        description: 'Fecha y hora de salida',
        example: '2023-07-01T10:00:00Z',
        required: false,
      })
      @IsOptional()
      @IsString()
      exit?: String;
    
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

      @ApiProperty({
        description: 'ID del cliente asociado al ticket',
        example: 'uuid-of-client',
      })
      @IsUUID()
      idClient: string;
    
      @ApiProperty({
        description: 'ID del parking asociado al ticket',
        example: 'uuid-of-parking',
      })
      @IsUUID()
      idParking: string;

   
}
