import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CheckVerificationCodeDto {
 
  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty({example: '123456'})
  code: string;

}
