import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InvoiceItemsDTO {
  @IsString()
  @ApiProperty({ example: '000' })
  itemCode: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  purchasedQuantity: number;

  @IsNumber()
  @ApiProperty({ example: 250 })
  price: number;

  @IsString()
  @ApiProperty({ example: 'Buy by subscription' })
  nameEn: string;

  @IsString()
  @ApiProperty({ example: 'اشتراك باى باى' })
  nameAr: string;

  @IsNumber()
  @ApiProperty({ example: 250 })
  amount: number;
}
