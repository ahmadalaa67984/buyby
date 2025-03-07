import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdatePackageExtraLimitDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1 })
  extraLimit?: number;
}
