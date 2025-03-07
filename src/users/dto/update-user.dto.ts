import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { RolesEnum } from '../enums/roles.enum';
export class UpdateUserDto extends PickType(SignUpDto, [
  'name',
  'profilePicture',
  'address',
] as const) {
  @IsOptional()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  @ApiProperty({ example: RolesEnum.RESTURANT })
  role?: RolesEnum;
}
