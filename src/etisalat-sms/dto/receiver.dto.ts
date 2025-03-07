import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { Characteristic } from './characteristic.dto';
import { Type } from 'class-transformer';
export class Receiver {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;
}

export class ReceiverBulk {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'phoneNumber' })
  name: string = 'phoneNumber';

  @IsOptional()
  @IsArray()
  @Type(() => Characteristic)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Characteristic] })
  characteristic?: Characteristic[];
}
