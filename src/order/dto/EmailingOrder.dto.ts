import { IsEmail, IsString } from 'class-validator';

export class EmailingOrderDto {
  @IsString()
  orderLink: string;

  @IsString()
  storeName: string;

  @IsEmail()
  customerEmail: string;
}
