import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Characteristic {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'body' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Hello to Etisalat world' })
  value: string;
}
