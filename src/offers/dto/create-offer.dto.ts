import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsDate } from 'class-validator';

export class CreateOfferDto {
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
    description: 'Precio de la oferta',
    example: 100.0,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Descuento de la oferta',
    example: 20.0,
  })
  @IsNumber()
  discount: number;

  @ApiProperty({
    description: 'Fecha y hora de la oferta',
    example: '2023-07-01T00:00:00Z',
  })
  @IsDate()
  time: Date;

  @ApiProperty({
    description: 'ID del parking al que pertenece la oferta',
    example: 'uuid-of-parking',
  })
  @IsUUID()
  idParking: string;
}