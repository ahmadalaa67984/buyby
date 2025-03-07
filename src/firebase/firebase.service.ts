import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { ConfigService } from 'src/config/config.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { UserDoc } from 'src/users/entities/user.entity';
import { RolesEnum } from 'src/users/enums/roles.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FireBaseService {
  private readonly businessApp: admin.app.App;
  private readonly customerApp: admin.app.App;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    // * config businessApp
    const businessAppConfig: ServiceAccount = {
      projectId: this.configService.firebase.FIREBASE_PROJECT_ID_BUS,
      privateKey: this.configService.firebase.FIREBASE_PRIVATE_KEY_BUS.replace(/\\n/g, '\n'),
      clientEmail: this.configService.firebase.FIREBASE_CLIENT_EMAIL_BUS,
    };
    // * config CustomerApp
    const customersAppConfig: ServiceAccount = {
      projectId: this.configService.firebase.FIREBASE_PROJECT_ID_CUS,
      privateKey: this.configService.firebase.FIREBASE_PRIVATE_KEY_CUS.replace(/\\n/g, '\n'),
      clientEmail: this.configService.firebase.FIREBASE_CLIENT_EMAIL_CUS,
    };

    // * create businessApp
    this.businessApp = admin.initializeApp(
      {
        credential: admin.credential.cert(businessAppConfig),
      },
      'businessApp',
    );

    // * create customerApp
    this.customerApp = admin.initializeApp(
      {
        credential: admin.credential.cert(customersAppConfig),
      },
      'customerApp',
    );
  }

  getBusinessApp(): admin.app.App {
    return this.businessApp;
  }

  getCustomerApp(): admin.app.App {
    return this.customerApp;
  }

  /*
   * send notification with firebase
   */

  // * function to notify user
  async notifyUser(
    user: UserDoc,
    dto: CreateNotificationDto,
    app: admin.app.App,
  ): Promise<{ notificationStatus: BatchResponse; userId: Types.ObjectId }> {
    if (user?.devicesToken?.length > 0) {
      if (dto.notificationData.imageUrl) {
        try {
          const message = {
            notification: {
              title: dto.notificationData.title,
              body: dto.notificationData.body,
              imageUrl: dto?.notificationData?.imageUrl,
            },

            android: {
              ttl: 3600 * 1000,
              notification: {
                imageUrl: dto.notificationData.imageUrl,
              },
            },
            apns: {
              payload: {
                aps: {
                  badge: 42,
                },
              },
            },
            tokens: user.devicesToken,
          };

          const notificationStatus = await admin.messaging(app).sendEachForMulticast(message);

          return { notificationStatus, userId: user._id };
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      } else {
        const message = {
          notification: {
            title: dto.notificationData.title,
            body: dto.notificationData.body,
          },

          android: {
            ttl: 3600 * 1000,
            notification: {
              icon: 'stock_ticker_update',
              color: '#D01C23',
            },
          },
          apns: {
            payload: {
              aps: {
                badge: 42,
              },
            },
          },
          tokens: user.devicesToken,
        };
        const notificationStatus = await admin.messaging(app).sendEachForMulticast(message);
        return { notificationStatus, userId: user._id };
      }
    }
  }

  // * send notification method
  async sendNotification(dto: CreateNotificationDto) {
    const businessApp = this.getBusinessApp();
    const customerApp = this.getCustomerApp();

    let ids: Types.ObjectId[] = [];
    // * notify all customers
    if (dto.allCustomers == true) {
      const customers = await this.usersService.find({ role: RolesEnum.CUSTOMER });
      for (const customer of customers) {
        // console.log('customer', customer);
        const response = await this.notifyUser(customer, dto, customerApp);
        // console.log('response from customer', response);
        if (response?.notificationStatus?.successCount) ids.push(response.userId);
      }
      // console.log('ids from customers', ids);
    }

    // * notify all bassness user
    if (dto.allBusinessOwners == true) {
      const users = await this.usersService.find({
        $or: [{ role: RolesEnum.RESTURANT }, { role: RolesEnum.MERCHANT }],
      });
      for (const user of users) {
        // console.log('user', user);
        const response = await this.notifyUser(user, dto, businessApp);
        // console.log('response from business', response);
        if (response?.notificationStatus?.successCount) ids.push(response.userId);
      }
      // console.log('ids from business', ids);
    }

    // * notify user by Id
    if (dto.userIds?.length > 0) {
      for (const userId of dto.userIds) {
        const user = await this.usersService.findOneById(userId);
        if (!user) continue;
        // console.log('user from user ids', user);
        let response: {
          notificationStatus: BatchResponse;
          userId: Types.ObjectId;
        };
        if (user.role === RolesEnum.RESTURANT || user.role === RolesEnum.MERCHANT)
          response = await this.notifyUser(user, dto, businessApp);
        else if (user.role === RolesEnum.CUSTOMER)
          response = await this.notifyUser(user, dto, customerApp);
        // console.log('response from user ids', response);
        if (response?.notificationStatus?.successCount) ids.push(response.userId);
      }
      // console.log('ids from send by user id', ids);
    }

    return ids;
  }

  async sendAlertNotification(
    id,
    warehouseName: string,
    stockitemName: string,
    reOrderPoint: number,
    qtyOnHand: number,
    qtyToOrder: number,
  ) {
    const user = await this.usersService.findOneById(this.usersService.toObjectId(id));
    if (user?.devicesToken?.length > 0) {
      const body = `A shortage in ${warehouseName}.
      It reached the re-order point of ${reOrderPoint} and the quantity to order is ${qtyToOrder}`;
      const message = {
        notification: {
          title: stockitemName,
          body: body,
        },
      };
      const notificationStatus = await admin.messaging().sendToDevice(user.devicesToken, message);
      // console.log(notificationStatus);
      return { notificationStatus, id };
    }
  }
  async sendExpiryNotification(
    id,
    warehouseName: string,
    stockItemName: string,
    qtyToExpire: number,
  ) {
    const user = await this.usersService.findOneById(this.usersService.toObjectId(id));
    if (user?.devicesToken?.length > 0) {
      const body = `The ${stockItemName} in ${warehouseName} warehouse has a quantity of ${qtyToExpire} about to expire.`;
      const message = {
        notification: {
          title: `Stock item ${stockItemName} about to expire`,
          body: body,
        },
        android: {
          ttl: 3600 * 1000,
          notification: {
            icon: 'stock_ticker_update',
            color: '#D01C23',
          },
        },
        apns: {
          payload: {
            aps: {
              badge: 42,
            },
          },
        },
        tokens: user.devicesToken,
      };

      const notificationStatus = await admin.messaging().sendMulticast(message);
      return { notificationStatus, id };
    }
  }
}
