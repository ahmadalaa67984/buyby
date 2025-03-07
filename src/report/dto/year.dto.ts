import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class YearDto {
  @IsNumber()
  @Min(2000)
  @Max(9999)
  @ApiProperty({ type: Number, example: 2023 })
  currentYear: number;
}
