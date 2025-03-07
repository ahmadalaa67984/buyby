import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;
}
