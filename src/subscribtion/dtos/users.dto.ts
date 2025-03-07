import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

import { IsObjectId } from 'src/core/validators';

export class UsersId {
  @IsOptional()
  @IsObjectId()
  @ApiProperty({ example: '637f6099eeb74c2c74e5b2d2' })
  userId?: Types.ObjectId;
}
