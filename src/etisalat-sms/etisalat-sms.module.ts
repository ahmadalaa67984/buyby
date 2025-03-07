import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'src/config/config.module';
import { EtisalatSMS, EtisalatSMSSchema } from './entities/etisalat-sms.entity';
import { EtisalatSMSService } from './etisalat-sms.service';
import { EtisalatSMSController } from './etisalat-sms.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EtisalatSMS.name, schema: EtisalatSMSSchema }]),
    HttpModule,
    ConfigModule.Deferred,
    UsersModule,
  ],
  providers: [EtisalatSMSService],
  controllers: [EtisalatSMSController],
  exports: [EtisalatSMSService],
})
export class EtisalatSMSModule {}
