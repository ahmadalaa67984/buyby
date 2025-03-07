/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import axios, { isAxiosError } from 'axios';
import * as https from 'https';
import { readFileSync } from 'fs';

import { RequestWithUser } from 'src/core/interfaces';
import { BaseService } from 'src/core/shared';
import { InjectModel } from '@nestjs/mongoose';
import * as CircularJSON from 'circular-json';
import { EtisalatSMS, EtisalatSMSDoc } from './entities/etisalat-sms.entity';
import { CreateEtisalatBulkSMS, CreateEtisalatSingleSMS } from './dto/etisalat-sms.dto';
import { MessageTypeEnum } from './enums/message-type.enum';
import { Characteristic } from './dto/characteristic.dto';
import { ConfigService } from 'src/config/config.service';
import { BadRequestError } from 'passport-headerapikey';
import { UsersService } from 'src/users/users.service';
import { RolesEnum } from 'src/users/enums/roles.enum';

@Injectable()
export class EtisalatSMSService extends BaseService<EtisalatSMSDoc> {
  constructor(
    @InjectModel(EtisalatSMS.name) readonly m: Model<EtisalatSMSDoc>,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super(m);
  }

  private header() {
    const headers = {
      Authorization: `Basic ${this.configService.etisalat.ETISALAT_HEADER_AUTH}`,
      'x-Gateway-APIKey': this.configService.etisalat.ETISALAT_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return headers;
  }

  async etisalatSMS(req: RequestWithUser, dto: CreateEtisalatSingleSMS) {
    try {
      dto.receiver.forEach((receiver) => {
        if (receiver.phoneNumber.length === 11 && receiver.phoneNumber[0] === '0') {
          receiver.phoneNumber = '2' + receiver.phoneNumber;
        }
      });

      const url = this.configService.etisalat.ETISALAT_BASE_URL_SINGLE;
      const payload = {
        id: this.configService.etisalat.ETISALAT_ID,
        messageType: MessageTypeEnum.SMS,
        characteristic: [
          {
            name: 'Authorization',
            value: this.configService.etisalat.ETISALAT_PAYLOAD_AUTH,
          },
          {
            name: 'templateID',
            value: this.configService.etisalat.ETISALAT_TEMP_ID,
          },
          {
            name: 'body',
            value: `${dto.url}`,
          },
        ],
        receiver: dto.receiver,
      };

      const headers = this.header();

      const res = await axios.post(url, payload, { headers });
      const str = CircularJSON.stringify(res);
      // console.log('res', str);

      return { status: res.status, statusText: res.statusText };
    } catch (err: unknown) {
      if (isAxiosError(err))
        throw new BadRequestError({ message: err?.message, status: err?.response?.status });
      else if (err instanceof Error) throw new BadRequestError(err.message);
      else throw new BadGatewayException(String(err));
    }
  }

  private validatePhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber.length === 11 && phoneNumber[0] === '0') return '2' + phoneNumber;
    else return phoneNumber;
  };

  private isValidPhoneNumber = (phoneNumber: string): boolean => {
    return phoneNumber.length == 12 && phoneNumber[0] === '2';
  };

  async bulkSMS(req: RequestWithUser, dto: CreateEtisalatBulkSMS) {
    try {
      const { allBusinessOwners, allCustomers, userIds, message } = dto;
      let receiver: any[] = [];

      if (allBusinessOwners) {
        const businessOwners = await this.userService.find({
          $or: [{ role: RolesEnum.MERCHANT }, { role: RolesEnum.RESTURANT }],
        });

        for (let { phoneNumber } of businessOwners) {
          if (!phoneNumber) continue;
          phoneNumber = this.validatePhoneNumber(phoneNumber);
          if (!this.isValidPhoneNumber(phoneNumber)) continue;

          // console.log('phone number from all business Owners', phoneNumber);
          receiver.push({
            id: phoneNumber,
            name: 'phoneNumber',
            characteristic: [{ name: 'body', value: message }],
          });
        }
        // console.log('receivers from all business Owners', receiver);
      }

      if (allCustomers) {
        const customers = await this.userService.find({
          role: RolesEnum.CUSTOMER,
        });

        for (let { phoneNumber } of customers) {
          if (!phoneNumber) continue;
          phoneNumber = this.validatePhoneNumber(phoneNumber);
          if (!this.isValidPhoneNumber(phoneNumber)) continue;

          // console.log('phone number from all customers', phoneNumber);
          receiver.push({
            id: phoneNumber,
            name: 'phoneNumber',
            characteristic: [{ name: 'body', value: message }],
          });
        }
        // console.log('receivers from all customers', receiver);
      }

      if (userIds?.length > 0) {
        for (const id of userIds) {
          let { phoneNumber } = await this.userService.findOneById(id);
          if (!phoneNumber) continue;
          phoneNumber = this.validatePhoneNumber(phoneNumber);
          if (!this.isValidPhoneNumber(phoneNumber)) continue;

          // console.log('phone number from selected users', phoneNumber);

          receiver.push({
            id: phoneNumber,
            name: 'phoneNumber',
            characteristic: [{ name: 'body', value: message }],
          });
        }
        // console.log('receivers from selected user', receiver);
      }

      // console.log('receivers', receiver);

      const url = this.configService.etisalat.ETISALAT_BASE_URL_BULK;
      const payload = {
        id: this.configService.etisalat.ETISALAT_ID,
        messageType: MessageTypeEnum.SMS,
        characteristic: [
          {
            name: 'authorization',
            value: this.configService.etisalat.ETISALAT_PAYLOAD_AUTH,
          },
          {
            name: 'templateId',
            value: this.configService.etisalat.ETISALAT_TEMP_ID,
          },
          {
            name: 'senderName',
            value: 'Buy By app',
          },
          {
            name: 'accountId',
            value: this.configService.etisalat.ETISALAT_ACCOUNT_ID,
          },
          {
            name: 'crossNet',
            value: 'true',
          },
          {
            name: 'providerNames',
            value: 'etisalat,vodafone,we,orange',
          },
          // {
          //   name: 'smsScript',
          //   value: `${dto.message}`,
          // },
        ],
        receiver,
      };

      const headers = this.header();

      // console.log({ url });
      // console.log(receiver);

      const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        cert: readFileSync(`${__dirname}/../../../sslfiles/public_cert.pem`),
        key: readFileSync(`${__dirname}/../../../sslfiles/private_key.pem`),
        passphrase: this.configService.etisalat.ETISALAT_CERT_PASSWORD,
      });

      const res = await axios.post(url, payload, { headers, httpsAgent });
      const str = CircularJSON.stringify(res);
      // console.log('res', str);

      return { status: res.status, statusText: res.statusText };
    } catch (err) {
      if (isAxiosError(err))
        throw new BadRequestError({ message: err?.message, status: err?.response?.status });
      else if (err instanceof Error)
        throw new BadGatewayException({ message: err.message, status: 500 });
      else throw new BadGatewayException({ message: String(err), status: 500 });
    }
  }
}
