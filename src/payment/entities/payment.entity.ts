import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from '../../core/entities';
import { CardItem } from '../dto/card-item.dto';

export type PaymentDoc = Payment & Document;

@Schema({ timestamps: true, versionKey: false, id: false })
export class Payment extends BaseEntity {
  @Prop({
    type: Types.ObjectId,
    required: false,
    ref: User.name,
  })
  userId: Types.ObjectId;

  @Prop({ type: String, required: false })
  merchantRefNumber: string;

  @Prop({ type: String, required: false })
  invoiceNo: string;

  @Prop({ type: Number, required: false })
  paymentAmount: number;

  @Prop({ type: String, required: false })
  orderStatus: string;

  @Prop({ type: String, required: false })
  userEmail: string;

  @Prop({ type: String, required: false })
  userPhone: string;

  @Prop({ type: String, required: false })
  userName: string;

  @Prop({ type: [], required: false })
  orderItems: [];

  @Prop({ type: String, required: false })
  dueDate: string;

  @Prop({ type: String, required: false })
  operation: string;

  @Prop({ type: String, required: false })
  payment_method: string;
  @Prop({ type: String, required: false })
  amount: string;
  @Prop({ type: String, required: false })
  cardNumber: string;
  @Prop({ type: String, required: false })
  cardExpiryYear: string;
  @Prop({ type: String, required: false })
  cardExpiryMonth: string;
  @Prop({ type: String, required: false })
  cvv: string;
  @Prop({ type: String, required: false })
  merchant_sec_key: string;
  @Prop({ type: String, required: false })
  merchantRefNum: string;
  @Prop({ type: String, required: false })
  currencyCode: string;
  @Prop({ type: String, required: false })
  language: string;
  @Prop({ type: CardItem, required: false })
  chargeItems: CardItem[];
  @Prop({ type: String, required: false })
  enable3DS: string;
  @Prop({ type: String, required: false })
  authCaptureModePayment: string;
  @Prop({ type: String, required: false })
  paymentMethod: string;
  @Prop({ type: String, required: false })
  signature: string;
  @Prop({ type: String, required: false })
  description: string;
  @Prop({ type: String, required: false })
  customerMobile: string;
  @Prop({ type: String, required: false })
  customerEmail: string;
  @Prop({ type: Number, required: false })
  accountId: number;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
