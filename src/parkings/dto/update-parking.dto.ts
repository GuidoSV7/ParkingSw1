import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateParkingDto {


  @ApiProperty({
    description: 'Nombre del Parking',
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'https://www.la-razon.com/wp-content/uploads/2023/01/11/02/COLEGIOS-LA-PAZ-LORETO-COLEGIO-LORETTO.jpg',
    description: 'Foto del Parking',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiProperty({
    description: 'Número de espacios',
    example: 100,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  numberOfSpaces?: number;

  @ApiProperty({
    description: 'Horas de apertura',
    example: '8 AM - 10 PM',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  openingHours?: string;

  @ApiProperty({
    description: 'Correo electrónico del Parking',
    example: 'parking@example.com',
    nullable: true,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Contraseña del Parking',
    example: 'password123',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Número de celular del Parking',
    example: '+1234567890',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  cellphone?: string;

  @ApiProperty({
    description: 'Dirección del Parking',
    example: '123 Main St, City, Country',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  direction?: string;

  @ApiProperty({
    description: 'Coordenadas del Parking',
    example: '40.7128,-74.0060',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  coordinates?: string;

  @ApiProperty({
    description: 'URL de Google Maps del Parking',
    example: 'https://maps.google.com/?q=40.7128,-74.0060',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  urlGoogleMaps?: string;

  @ApiProperty({
    description: 'ID del manager asociado al Parking',
    example: 'uuid-of-manager',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  idManager?: string;
}