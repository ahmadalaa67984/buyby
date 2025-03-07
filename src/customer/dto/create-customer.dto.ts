import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { IsObjectId } from 'src/core/validators';
import { Types } from 'mongoose';
export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'hemada abdallah' })
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ example: ' hmd123' })
  // customerCode:string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Customer address' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Maadi' })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Egypt' })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Cairo' })
  country?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneOne?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneTwo?: string;

  // @IsOptional()
  // @IsString()
  // @ApiProperty({ example: 'write your notes  here' })
  // notes?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false })
  receivePromotionalMessagesOrDiscounts: boolean;

  // @IsOptional()
  // @IsObjectId()
  // @ApiProperty({ type: String })
  // entityGuestId?: Types.ObjectId;

  @IsEmail()
  @ApiProperty({ example: 'hemedah94@gmail.com' })
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}
