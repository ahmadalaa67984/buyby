import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { toObjectId } from 'src/core/utils';
import { IsObjectId } from 'src/core/validators';
import { DeliveryTermsEnum } from '../enum/delivery-terms-enum';
import { PaymentTypeEnum } from '../enum/payment.enum';

export class SupplierDetails {
  @IsOptional()
  @IsString()
  ContactPersonName?: string;
  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'person@gmail.com' })
  ContactPersonEmail?: string;
  @IsOptional()
  @IsString()
  ContactPersonPhone?: string;
  @IsOptional()
  @IsString()
  Title?: string;
}
export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  city: string;
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  TaxID: string;

  @IsOptional()
  @Type(() => SupplierDetails)
  @ValidateNested()
  contactPersonDetails?: SupplierDetails;
  @IsBoolean()
  acceptsOrderByEmail: boolean;
  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum(PaymentTypeEnum)
  @ApiProperty({ example: PaymentTypeEnum.POST_PAID })
  paymentTerms: PaymentTypeEnum;

  // @IsObjectId()
  // @ApiProperty({ type: Types.ObjectId, example: '637f604deeb74c2c74e5b2c6' })
  // entityId: Types.ObjectId;
  // @IsEnum(DeliveryTermsEnum)
  // @ApiProperty({ example:DeliveryTermsEnum.cfr })
  // deliveryTerms: DeliveryTermsEnum;
}
