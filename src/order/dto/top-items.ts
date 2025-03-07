import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TopItems {
  /**
   * Used to filter by date from like 2022-01-01
   */

  @IsString()
  @ApiProperty({ type: String, example: '2022-01-01' })
  filterByDateFrom: string;

  /**
   * Used to filter by date to like 2024-01-02
   */

  @IsString()
  @ApiProperty({ type: String, example: '2024-01-02' })
  filterByDateTo: string;

  @IsNumber()
  @ApiProperty({ type: Number, example: 5 })
  limit: number;
}
