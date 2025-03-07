import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { IsStrongPassword } from 'src/core/decorators';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { RoleGroups, RolesEnum } from '../enums/roles.enum';

export class CreateUserDto extends PickType(SignUpDto, ['password'] as const) {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'hemedah94@gmail.com' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;

  @IsIn(RoleGroups.ADMINISTRATION)
  @ApiProperty({ example: RolesEnum.SUPER_ADMIN })
  @IsNotEmpty()
  role: RolesEnum;

  @IsOptional()
  @IsStrongPassword()
  @ApiProperty({ example: 'P@ssw0rd' })
  pin: string;
}
