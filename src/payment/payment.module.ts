import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config/config.module';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { UsersModule } from 'src/users/users.module';
import { SubscriptionModule } from 'src/subscribtion/subscribtion.module';
import { EntitiesModule } from 'src/Entities/entity.module';
import { WarehouseManagementModule } from 'src/warehouse-management/warehouse-management.module';
import { OrderModule } from 'src/order/order.module';
import { TableModule } from 'src/tables/table.module';
import { CartModule } from 'src/cart/cart.module';
import { MailModule } from 'libs/mail/src';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    forwardRef(() => UsersModule),
    HttpModule,
    ConfigModule.Deferred,
    SubscriptionModule,
    EntitiesModule,
    WarehouseManagementModule,
    OrderModule,
    TableModule,
    CartModule,
    MailModule.Deferred,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
