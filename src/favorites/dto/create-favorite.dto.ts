import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'ID del cliente',
    example: 'uuid-of-client',
  })
  @IsUUID()
  idClient: string;

  @ApiProperty({
    description: 'ID del parking',
    example: 'uuid-of-parking',
  })
  @IsUUID()
  idParking: string;
}