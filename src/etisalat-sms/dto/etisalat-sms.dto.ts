import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';

import { Receiver, ReceiverBulk } from './receiver.dto';
import { IsObjectId } from 'src/core/validators';
import { toObjectId } from 'src/core/utils';

export class CreateEtisalatSingleSMS {
  @IsString()
  @ApiProperty({ example: '' })
  url: string;

  @IsOptional()
  @IsArray()
  @Type(() => Receiver)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Receiver] })
  receiver: Receiver[];
}

export class CreateEtisalatBulkSMS {
  @IsString()
  @ApiProperty({ example: '' })
  message: string;


  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  allCustomers: boolean = false;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  allBusinessOwners: boolean = false;
  

  @ValidateIf((value) => value.allCustomers == false && value.allBusinessOwners == false)
  @IsNotEmpty()
  @IsObjectId({ each: true })
  @Transform(({ value }) => toObjectId(value))
  @IsArray()
  @ApiProperty()
  userIds: Types.ObjectId[];
}
