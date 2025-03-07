import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsIn,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { SignUpDto } from 'src/auth/dto';
import { toObjectId } from 'src/core/utils';
import { IsObjectId } from 'src/core/validators';
import { RoleGroups, RolesEnum } from '../enums/roles.enum';

export class CreateProfileDto extends PickType(SignUpDto, [
  'password',
] as const) {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'hemedah94@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Abdallah Hemedah' })
  name?: string;

  @IsIn(RoleGroups.PROFILE)
  @ApiProperty({ example: RolesEnum.CASHIER })
  role: RolesEnum;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'image url' })
  profilePicture?: string;

  // @IsOptional()
  // @IsObjectId()
  // @Transform(({ value }) => toObjectId(value))
  // owner?: Types.ObjectId;
}
