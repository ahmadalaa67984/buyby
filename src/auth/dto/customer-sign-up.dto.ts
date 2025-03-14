import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { IsStrongPassword } from 'src/core/decorators';
import { RoleGroups, RolesEnum } from 'src/users/enums/roles.enum';

export class CustomerSignUpDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'hemedah94@gmail.com' })
  @IsNotEmpty()
  email: string;

  /** Password must be at least 8 characters and include one lowercase letter, one uppercase letter, and one digit. */
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: 'P@ssw0rd' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Abdallah Hemedah' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'cairo str.' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'image url' })
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false })
  receivePromotionalMessagesOrDiscounts: boolean;

  pin: string = '';
}
