import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateSuscriptionDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsDate()
    date: Date;
}