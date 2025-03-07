import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { SubscriptionTypeEnum } from 'src/users/enums/subscription-type.enum';
import { PricingEnum } from '../enum/pricing.enum';
import { UsersId } from './users.dto';

export class UpdatePackageTypeDto {
  @IsNotEmpty()
  @IsEnum(SubscriptionTypeEnum)
  @ApiProperty({ example: SubscriptionTypeEnum.CASHIER })
  subscriptionType: SubscriptionTypeEnum;

  @IsNotEmpty()
  @IsEnum(PricingEnum)
  @ApiProperty({ example: PricingEnum.QUARTERLY })
  pricing: PricingEnum;

  @IsOptional()
  @IsArray()
  @Type(() => UsersId)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [UsersId] })
  users?: UsersId[];
}
