import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';


export class UpdateCustomerDto extends PickType(CreateCustomerDto, ['address','city','state', 'country', 'phoneTwo'] as const){

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+3334444' })
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(201)[0-2,5]{1}[0-9]{8}$/gm)
  @ApiProperty({ example: '201000200011' })
  phoneOne?: string;
  
}

