import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { IsObjectId } from 'src/core/validators';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { NameLocalized } from 'src/stock-item-data/dto/create-stockitem.dto';

export class ItemQuotation {

  
  @IsNotEmpty()
  @IsObjectId()
  @ApiProperty({ example:'637f604deeb74c2c74e5b2c6' })
  stockItemId: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => NameLocalized)
  @ValidateNested({ each: true })
  nameLocalized: NameLocalized;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sellingPrice:number;
  
}
