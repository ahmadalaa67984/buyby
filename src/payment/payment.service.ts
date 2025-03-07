import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { InjectModel } from '@nestjs/mongoose';

import { ConfigService } from 'src/config/config.service';
import { RequestWithUser } from 'src/core/interfaces';
import { BaseService } from 'src/core/shared';
import { Payment, PaymentDoc } from './entities/payment.entity';
import { PricingEnum } from 'src/subscribtion/enum/pricing.enum';
import { SubscriptionTypeEnum } from 'src/users/enums/subscription-type.enum';
import { pricing } from 'src/subscribtion/objects/pricing';
import { packages } from 'src/subscribtion/objects/packages';
import { StatusEnum } from 'src/users/enums/status.enum';
import { UsersService } from 'src/users/users.service';
import { UpdatePackageTypeDto } from 'src/subscribtion/dtos/update-package-type.dto';
import { InvoiceItemsDTO } from './dto/invoice-items.dto';
import { SubscriptionService } from 'src/subscribtion/subscribtion.service';
import { UpdatePackageExtraLimitDto } from 'src/subscribtion/dtos/update-package-extra-limit.dto';
import { PaymentOperationEnum } from './enums/payment-operation.enum';
import { PaymentOperationStatusEnum } from './enums/payment-operation-status.enum';
import { CreateCustomerOrderDto } from 'src/customer-order/dto/create-customer-order.dto';
import { EntitiesService } from 'src/Entities/entity.service';
import { WarehouseManagementService } from 'src/warehouse-management/warehouse-management.service';
import { OrderService } from 'src/order/order.service';
import { OrderStatusEnum } from 'src/order/enums/order-status.enum';
import { TableService } from 'src/tables/table.service';
import { CartService } from 'src/cart/cart.service';
import { MailService } from '@buyby/mail/mail.service';

@Injectable()
export class PaymentService extends BaseService<PaymentDoc> {
  constructor(
    @InjectModel(Payment.name) readonly m: Model<PaymentDoc>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly subscriptionService: SubscriptionService,
    private readonly entitiesService: EntitiesService,
    private readonly warehouseService: WarehouseManagementService,
    private readonly orderService: OrderService,
    private readonly tableService: TableService,
    private readonly cartService: CartService,
    private readonly mailService: MailService,
  ) {
    super(m);
  }

  // login to fawry dashboard body
  async login() {
    const userIdentifier = this.configService.fawry.FAWRY_USER;
    const password = this.configService.fawry.FAWRY_PASSWORD;

    const loginBody = {
      userIdentifier,
      password,
    };

    try {
      const loginUrl = `${this.configService.fawry.FAWRY_BASE_URL}/user-api/auth/login?=`;
      return await axios.post(loginUrl, loginBody);
    } catch (error) {
      throw new BadRequestException('login to fawry faild');
    }
  }

  // get Invoice number
  async getInvoiceNumber(token: string, body) {
    // console.log('body', body);

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    // console.log('year', year);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const invoiceBody = {
      sendingDate: formattedDate,
      releaseDate: currentDate.toISOString(),
      expiryDate: new Date(currentDate.setDate(currentDate.getDate() + 2)),
      requiredCustomerData: [
        {
          id: 1,
          code: 'NAME',
          nameAr: 'اسم العميل',
          nameEn: 'Customer name',
        },
        {
          id: 2,
          code: 'EMAIL',
          nameAr: 'البريد الالكتروني',
          nameEn: 'Email',
        },
        {
          id: 3,
          code: 'MOBILE_NUMBER',
          nameAr: 'الهاتف',
          nameEn: 'Mobile number',
        },
      ],

      items: body.items,
      amount: body.amount,
      preferredPaymentMethod: 'CARD',
      taxes: body.taxes ? body.taxes : 0,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const paymentLinkUrl = `${this.configService.fawry.FAWRY_BASE_URL}/invoice-api/invoices/payment-link`;

    try {
      return await axios.post(paymentLinkUrl, invoiceBody, {
        headers,
      });
    } catch (error) {
      // console.log(error);

      throw new BadRequestException("can't fetch Invoice Number");
    }
  }

  async invoiceStatus(invoiceNumber, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      return await axios.get(
        `${this.configService.fawry.FAWRY_BASE_URL}/invoice-api/invoices/${invoiceNumber}/details`,
        { headers },
      );
    } catch (error) {
      throw new BadRequestException("can't get invoice Status");
    }
  }

  async paySubscription(req: RequestWithUser, dto: InvoiceItemsDTO) {
    axiosRetry(axios, { retries: 3 });
    let amount = 0;

    // check if provider status if paid or not
    if (req.user.status === StatusEnum.PAID) {
      throw new BadRequestException('subscription already paid');
    }

    const extraLimit = req.user.extraLimit;
    let extraLimitPrice = 0;
    // get the pricing plan fee to pay;
    if (req.user.pricing === PricingEnum.QUARTERLY) {
      extraLimitPrice += extraLimit * pricing.EXTRA_USER.quarterly_vat;

      if (req.user.subscriptionType === SubscriptionTypeEnum.CASHIER) {
        amount = pricing.CASHIER.quarterly_vat;
        // note = 'Quarterly Cashier plan fee';
      }
      if (req.user.subscriptionType === SubscriptionTypeEnum.PRO_CASHIER) {
        amount = pricing.PRO_CASHIER.quarterly_vat;
        // note = 'Quarterly Pro Cashier plan fee';
      }
      if (req.user.subscriptionType === SubscriptionTypeEnum.PREMIUM_CASHIER) {
        amount = pricing.PREMIUM_CASHIER.quarterly_vat;
        // note = 'Quarterly premium Cashier plan fee';
      }
    } else if (req.user.pricing === PricingEnum.ANNUALLY) {
      extraLimitPrice += extraLimit * pricing.EXTRA_USER.annually_vat;
      if (req.user.subscriptionType === SubscriptionTypeEnum.CASHIER) {
        amount = pricing.CASHIER.annually_vat_discount;
        // note = 'Annually Cashier plan fee';
      }
      if (req.user.subscriptionType === SubscriptionTypeEnum.PRO_CASHIER) {
        amount = pricing.PRO_CASHIER.annually_vat_discount;
        // note = 'Annually pro Cashier plan fee';
      }
      if (req.user.subscriptionType === SubscriptionTypeEnum.PREMIUM_CASHIER) {
        amount = pricing.PREMIUM_CASHIER.annually_vat_discount;
        // note = 'Annually premium Cashier plan fee';
      }
    }

    extraLimitPrice = req.user.packageId ? 0 : extraLimitPrice;
    // console.log('extra', extraLimitPrice);
    const invoiceBody = {
      items: [
        {
          itemCode: '000',
          purchasedQuantity: dto.purchasedQuantity,
          price: amount + extraLimitPrice,
          nameEn: dto.nameEn,
          nameAr: dto.nameAr,
        },
      ],
      amount: amount + extraLimitPrice,
    };

    try {
      //* login to fawry
      const loginResponse = await this.login();
      const token = loginResponse.data.token;

      //* pay subscription & Get Invoice Number
      const paymentLinkResponse = await this.getInvoiceNumber(token, invoiceBody);

      //* get Invoice status
      const response = await this.invoiceStatus(paymentLinkResponse.data, token);
      //? // console.log('response -> ', response.data);

      //* save invoice Number in user schema
      await this.usersService.updateOne(
        { _id: req.user._id },
        {
          invoiceNumber: response.data.number,
        },
        { password: 0, pin: 0 },
      );

      //* return payment URL
      return { paymentUrl: response.data.paymentUrl };
    } catch (error) {
      // console.log('err ->', error);
      throw new BadRequestException(error.message);
    }
  }

  // async payChangePackage(req: RequestWithUser, dto: UpdatePackageTypeDto) {
  //   const packageExist = await this.subscriptionService.findOne({
  //     ownerId: req.user._id,
  //   });
  //   if (!packageExist) throw new NotFoundException('084,R084');

  //   // if it change to the same subscription alert the provider
  //   if (
  //     packageExist.subscriptionType === dto.subscriptionType &&
  //     packageExist.pricing === dto.pricing
  //   ) {
  //     throw new BadRequestException('You are in the same package');
  //   }

  //   const Pricing = pricing[dto.subscriptionType];
  //   let price = 0;
  //   let packagePrice = 0;

  //   if (dto.pricing == PricingEnum.QUARTERLY) {
  //     packagePrice = Pricing.quarterly_vat;
  //   } else {
  //     packagePrice = Pricing.annually_vat_discount;
  //   }
  //   let extraUserPrice = 0;
  //   if (req.user.extraLimit > 0) {
  //     if (dto.pricing == PricingEnum.QUARTERLY) {
  //       extraUserPrice = pricing.EXTRA_USER.quarterly_vat * req.user.extraLimit;
  //     } else {
  //       extraUserPrice =
  //         pricing.EXTRA_USER.annually_vat_discount * req.user.extraLimit;
  //     }
  //   }
  //   price = packagePrice + extraUserPrice;

  //   axiosRetry(axios, { retries: 3 });
  //   try {
  //     //* login to fawry
  //     const loginResponse = await this.login();
  //     const token = loginResponse.data.token;

  //     //* pay subscription & Get Invoice Number
  //     const invoiceBody = {
  //       items: [
  //         {
  //           itemCode: 'BBB',
  //           purchasedQuantity: 1,
  //           price: price,
  //           nameEn: 'Buy-by change subscription',
  //           nameAr: 'تغير اشتراك باى باى',
  //         },
  //       ],
  //       amount: price,
  //     };

  //     const paymentLinkResponse = await this.getInvoiceNumber(
  //       token,
  //       invoiceBody,
  //     );

  //     //* get Invoice status
  //     const response = await this.invoiceStatus(
  //       paymentLinkResponse.data,
  //       token,
  //     );
  //     //? // console.log('response -> ', response.data);

  //     //* save invoice Number in user schema
  //     // console.log('start update');
  //     await this.usersService.updateOne(
  //       { _id: req.user._id },
  //       {
  //         invoiceNumber: response.data.number,
  //         paymentOperationType: PaymentOperationEnum.CHANGE_PACKAGE,
  //         paymentOperationStatus: PaymentOperationStatusEnum.PENDING,
  //         paidSubType: dto.subscriptionType,
  //         paidSubPricing: dto.pricing,
  //       },
  //       { password: 0, pin: 0 },
  //     );

  //     //* return payment URL
  //     return { paymentUrl: response.data.paymentUrl };
  //   } catch (error) {
  //     // console.log('err ->', error);
  //     throw new BadGatewayException(error.message);
  //   }
  // }

  async payExtraUser(req: RequestWithUser, dto: UpdatePackageExtraLimitDto) {
    const packageExist = await this.findOne({ ownerId: req.user._id });
    if (!packageExist) throw new NotFoundException('084,R084');

    let extraUserPrice = 0;

    const countOfExtraUsers = dto.extraLimit - req.user.extraLimit;

    if (req.user.pricing == PricingEnum.QUARTERLY) {
      extraUserPrice = pricing.EXTRA_USER.quarterly_vat * countOfExtraUsers;
    } else {
      extraUserPrice = pricing.EXTRA_USER.annually_vat_discount * countOfExtraUsers;
    }

    axiosRetry(axios, { retries: 3 });
    try {
      //* login to fawry
      const loginResponse = await this.login();
      const token = loginResponse.data.token;

      //* pay subscription & Get Invoice Number
      const invoiceBody = {
        items: [
          {
            itemCode: '000',
            purchasedQuantity: countOfExtraUsers,
            price: pricing.EXTRA_USER.quarterly_vat,
            nameEn: 'Buy-by Extra Users',
            nameAr: '',
          },
        ],
        amount: extraUserPrice,
      };

      const paymentLinkResponse = await this.getInvoiceNumber(token, invoiceBody);

      //* get Invoice status
      const response = await this.invoiceStatus(paymentLinkResponse.data, token);
      //? // console.log('response -> ', response.data);

      //* save invoice Number in user schema
      // console.log('start update');
      await this.usersService.updateOne(
        { _id: req.user._id },
        {
          invoiceNumber: response.data.number,
          paymentOperationType: PaymentOperationEnum.EXTRA_USERS,
          paymentOperationStatus: PaymentOperationStatusEnum.PENDING,
          paidExtraUser: dto.extraLimit,
        },
        { password: 0, pin: 0 },
      );

      //* return payment URL
      return { paymentUrl: response.data.paymentUrl };
    } catch (error) {
      // console.log('err ->', error);
      throw new BadGatewayException(error.data.error);
    }
  }

  async payCustomerOrder(req: RequestWithUser, id) {
    //* find order
    const order = await this.orderService.findOneById(id);
    if (!order) throw new NotFoundException('order is not exist');

    // check if order paid or not
    if (order.orderStatus === OrderStatusEnum.ACTIVE && order.status === StatusEnum.COMPLETED) {
      throw new BadRequestException('Order already paid');
    }

    // get order items & services;
    const items = order.items;
    const services = order.services;

    // console.log('items', items);
    // console.log('services', services);

    // create invoice body
    const invItems = [];
    let amount = 0;

    if (items) {
      items.forEach((item) => {
        invItems.push({
          itemCode: item.stockItemId,
          purchasedQuantity: item.qty,
          price: item.unitPrice,
          nameEn: item.nameLocalized.mainLanguage,
          nameAr: item.nameLocalized.secondLanguage,
        });
        amount += item.totalUnitPrice;
      });
    }

    if (services) {
      services.forEach((service) => {
        invItems.push({
          itemCode: service.serviceId,
          purchasedQuantity: service.qty,
          price: service.unitPrice,
          nameEn: service.name,
          nameAr: '',
        });
        amount += service.totalUnitPrice;
      });
    }

    axiosRetry(axios, { retries: 3 });
    try {
      //* login to fawry
      const loginResponse = await this.login();
      const token = loginResponse.data.token;

      const total = order.totalOrder;
      // * calc commission due to fawry & buy-by
      const buyByAmount: number = 2 + total * (2.5 / 100.5) + total * (10.0 / 100);
      // * calc provider amount
      const providerAmount: number = total - buyByAmount;

      //* pay for customer order & Get Invoice Number
      const invoiceBody = {
        items: [
          {
            itemCode: '000',
            purchasedQuantity: 1,
            price: Number(buyByAmount.toFixed(3)),
            nameEn: 'Buy-by',
            nameAr: 'باى ياى',
          },
          {
            itemCode: '1234',
            purchasedQuantity: 1,
            price: Number(providerAmount.toFixed(3)),
            nameEn: 'provider',
            nameAr: 'provider',
          },
        ],
        amount: order.totalOrder,
        taxes: order.vat,
      };

      // console.log('invoice body : ', JSON.stringify(invoiceBody));
      const paymentLinkResponse = await this.getInvoiceNumber(token, invoiceBody);

      //* get Invoice status
      const response = await this.invoiceStatus(paymentLinkResponse.data, token);
      //? // console.log('response -> ', response.data);

      //* save invoice Number in order schema
      // console.log('start update');
      await this.orderService.updateOne(
        { _id: order._id },
        {
          invoiceNumber: response.data.number,
          orderStatus: OrderStatusEnum.ONHOLD,
          status: StatusEnum.PENDING,
        },
        { password: 0, pin: 0 },
      );

      //* Disable sending mails etisalat SMS Do it
      // if (req.user.email && req.user.role === 'CUSTOMER') {
      //   await this.mailService.sendPaymentLinkMail(
      //     req.user.email,
      //     response.data.paymentUrl,
      //   );
      // } else {
      //   const mail = 'medomy1997@gmail.com';
      //   await this.mailService.sendPaymentLinkMail(
      //     mail,
      //     response.data.paymentUrl,
      //   );

      //   // console.log('email send');
      // }

      //* return payment URL
      return { paymentUrl: response.data.paymentUrl };
    } catch (error) {
      // console.log('err ->', error);
      throw new BadGatewayException(error.data.error);
    }
  }

  async handleWebhook(payload: any) {
    // console.log('payload->', payload);

    //* get provider who created the invoice
    let user = await this.usersService.findOne({
      invoiceNumber: payload.invoiceInfo.number,
    });

    // console.log('user', user);

    //* or the order just interact with
    const order = await this.orderService.findOne({
      invoiceNumber: payload.invoiceInfo.number,
    });

    //? // console.log('user:', user);

    let orderItems: [];
    let userId;

    if (user) {
      userId = user._id;
      //* subscription
      if (payload.orderStatus === StatusEnum.PAID && user.status === StatusEnum.PENDING) {
        let status;

        if (user.entityId) status = StatusEnum.COMPLETED;
        else status = StatusEnum.PAID;

        //* change provider status from pending to paid -- subscription
        await this.usersService.updateOne(
          { _id: user._id },
          {
            status: status,
          },
          { password: 0, pin: 0 },
        );

        if (user.packageId) {
          //  * change expire on based on package type
          await this.subscriptionService.m.updateOne(
            { _id: user.packageId },
            { expireOn: this.subscriptionService.calculateExpiry(user), active: true },
          );
        } else {
          //  create package
          const price = this.subscriptionService.calculatePackagePrice(user);

          const Package = await this.subscriptionService.m.create({
            ownerId: user._id,
            limits: this.subscriptionService.calaculateLimits(user),
            extraLimit: user.extraLimit,
            price: price,
            expireOn: this.subscriptionService.calculateExpiry(user),
            subscriptionType: user.subscriptionType,
            pricing: user.pricing,
            active: true,
          });

          user = await this.usersService.updateOne(
            { _id: user._id },
            {
              packageId: Package._id,
              price: price,
            },
            { password: 0, pin: 0 },
          );
        }
        // await this.subscriptionService.update(user.packageId, {
        //   active: true,
        // });
        orderItems = payload.orderItems;
      }

      // //* Change Package
      // if (
      //   payload.orderStatus === StatusEnum.PAID &&
      //   user.paymentOperationType === PaymentOperationEnum.CHANGE_PACKAGE &&
      //   user.paymentOperationStatus === PaymentOperationStatusEnum.PENDING
      // ) {
      //   //* change provider status of change package to paid -- change package
      //   await this.usersService.updateOne(
      //     { _id: user._id },
      //     {
      //       paymentOperationStatus: PaymentOperationStatusEnum.PAID,
      //     },
      //     { password: 0, pin: 0 },
      //   );
      //   // console.log('at Change');
      //   orderItems = payload.orderItems;
      // }

      //* Extra_Users
      if (
        user.paymentOperationType === PaymentOperationEnum.EXTRA_USERS &&
        user.paymentOperationStatus === PaymentOperationStatusEnum.PENDING &&
        payload.orderStatus === StatusEnum.PAID
      ) {
        //* do some magic **
        await this.usersService.updateOne(
          { _id: user._id },
          { paymentOperationStatus: PaymentOperationStatusEnum.PAID },
          { password: 0, pin: 0 },
        );
        // console.log('at Extra');
        orderItems = payload.orderItems;
      }
    } else if (order) {
      //* update order status if payment successes
      userId = order.customerId;
      if (
        order.orderStatus === OrderStatusEnum.ONHOLD &&
        order.status === StatusEnum.PENDING &&
        payload.orderStatus === StatusEnum.PAID
      ) {
        await this.orderService.updateOne(
          { _id: order._id },
          {
            orderStatus: OrderStatusEnum.ACTIVE,
            status: StatusEnum.COMPLETED,
          },
          { password: 0, pin: 0 },
        );
      }
      //* store orderItems
      orderItems = payload.orderItems;
      //* empty the cart
      const cartExist = await this.cartService.findOne({
        customerId: this.toObjectId(order.customerId),
      });
      if (cartExist) {
        // console.log('Cart', cartExist);
        await this.cartService.update(cartExist._id, { cartItems: [], subTotal: 0 }, {});
      }
    }

    //* save payment at it's schema
    //todo save payment history
    await this.create({
      userId,
      requestId: payload.requestId,
      merchantRefNumber: payload.merchantRefNumber,
      invoiceNo: payload.invoiceInfo.number,
      paymentAmount: payload.orderAmount,
      orderStatus: payload.orderStatus,
      transactionId: payload.transactionId || null,
      orderItems: orderItems,
      dueDate: payload.dueDate,
      operation: PaymentOperationEnum.CUSTOMER_ORDER,
    });

    return {
      status: 200,
      message: 'payload loaded.',
    };
  }

  async getPaymentStatus(req: RequestWithUser) {
    const invoice = await this.findOneAndErr({ userId: req.user._id });

    // console.log('invoiceFromDB', invoice);

    const merchantCode = this.configService.fawry.FAWRY_MERCHANT_CODE;
    const merchantRefNumber = invoice.merchantRefNumber;
    const merchant_sec_key = this.configService.fawry.FAWRY_SECURITY_KEY;
    const signature_body = merchantCode.concat(merchantRefNumber, merchant_sec_key);

    const hash = createHash('sha256');
    hash.update(signature_body, 'utf8');
    const signature = hash.digest('hex');

    const url = `${this.configService.fawry.FAWRY_BASE_URL}/ECommerceWeb/Fawry/payments/status/v2?merchantCode=${merchantCode}&merchantRefNumber=${merchantRefNumber}&signature=${signature}`;

    try {
      const response = await axios.get(url);
      // console.log('return respone', response.data);
      return response.data;
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }
}
