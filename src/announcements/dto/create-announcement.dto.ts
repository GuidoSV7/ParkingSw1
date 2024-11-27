import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({
    description: 'Título del anuncio',
    example: 'Nuevo horario de apertura',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción del anuncio',
    example: 'El nuevo horario de apertura es de 8 AM a 10 PM todos los días.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID del parking al que pertenece el anuncio',
    example: 'uuid-of-parking',
  })
  @IsUUID()
  idParking: string;
}