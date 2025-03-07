import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { EmailRequest, EmailResponse } from './interfaces';
import { EntityTypeEnum } from 'src/Entities/enum/entity-type.enum';
import { StockItemDoc } from 'src/stock-item-data/entities/stock-item.entity';
import { EntitiesDoc } from 'src/Entities/entities/entities.entity';

const FAILED_TO_SEND_EMAIL_EXCEPTION = 'Failed to send email';
@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  private getTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.gmailFrom,
        pass: this.configService.gmailPassword,
      },
    });
  }

  async sendForgotPasswordMail(email: string, token: string): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: `<p>${token} is your reset password code for BuyBy</p>`, // plain text body
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }

  async sendSignUpMail(email: string, token: string): Promise<EmailResponse> {
    const transporter = this.getTransporter();
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'Email Verification', // Subject line
      html: `Dear ${email},
        <br>
      Thanks for registering at BuyBy. ${token} 
      is your verification code for BuyBy
      <br>
      Best Regards ”`,
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }
    return response;
  }

  async sendReVerifyMail(email: string, token: string): Promise<EmailResponse> {
    const transporter = this.getTransporter();
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'Email ReVerification', // Subject line
      html: `Dear ${email},
        <br>
      Thanks for registering at BuyBy. ${token} 
      is your reverification code for BuyBy
      <br>
      Best Regards ”`,
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      // console.log('err', error);
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }

  async sendQuotationMail(
    email: string,
    sheet: any,
    // itemsList: Array<Object>,
  ): Promise<EmailResponse> {
    let tableDate: string = '';
    let total = 0;
    sheet.forEach((row) => {
      total += row.sellingPrice;
      tableDate += `<tr>
                      <td style="text-align: left; border:1px solid black;">${row.name}</td>
                      <td style="text-align: left; border:1px solid black;">${row.sellingPrice}</td>
                      <td style="text-align: left; border:1px solid black;">${row.storeName}</td>
                      <td style="text-align: left; border:1px solid black;">${row.storePhoneNumber}</td>
                      <td style="text-align: left; border:1px solid black;">${row.barcode}</td>
                      <td style="text-align: left; border:1px solid black;">${row.itemCode}</td>
                    </tr>`;
    });

    // console.log('tableData', tableDate);
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'Email Quotation', // Subject line
      html: `<!DOCTYPE html>
      <html>
      <body>
      <p>Dear ${email}</p>
      <p>This is a list of new items and their prices.</p>
      <table style="width:50%; border:1px solid black;" >
          <tr>
          <th style="text-align: left; border:1px solid black;">Name</th>
          <th style="text-align: left; border:1px solid black;" >Selling Price</th>
          <th style="text-align: left; border:1px solid black;" >Store Name</th>
          <th style="text-align: left; border:1px solid black;" >Store Phone Number</th>
          <th style="text-align: left; border:1px solid black;" >Barcode</th>
          <th style="text-align: left; border:1px solid black;" >Item code</th>
          </tr>
        ${tableDate}
      </table>
      <p>total = ${total} EGP</p>
      <p>Best Regards.</p>
      </body>
      </html>
      `,
    };
    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }

  async sendPaymentLinkMail(email: string, paymentLink: string): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'Payment', // Subject line
      html: `<p>Please follow this link ${paymentLink} to complete your order payment</p>`, // plain text body
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }

  async sendOrder(email: string, orderImg: string, storeName: string): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: email, // list of receivers
      subject: 'ٌٌReceipt', // Subject line
      html: `<p>This is your receipt information from ${storeName}</p>
             <img src="${orderImg}" alt="Receipt Info" width="500" height="600">`, // plain text body
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }

  async sendUpdateStockItemEmail(
    emails: string[],
    { name, entityType }: EntitiesDoc,
    { stockItemCode, sku, nameLocalized }: StockItemDoc,
  ) {
    const response: EmailResponse = { status: 'success', error: null };

    let itemCode: string = '';
    if (stockItemCode && stockItemCode.length > 0) itemCode = `code ${stockItemCode}`;
    else itemCode = `barcode ${sku}`;

    const mailOptions = {
      from: this.configService.gmailFrom, // sender address
      to: emails.join(','), // list of receivers
      subject: 'Stock Item Updated', // Subject line
      html: `<p>please note that stock item with ${itemCode}, named: (${nameLocalized.mainLanguage}) in entity of type: ${entityType} named: (${name}) is updated</p>`, // plain text body
    };

    try {
      await this.getTransporter().sendMail(mailOptions);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }
    // console.log('mail is send');
    return response;
  }

  /**
   * Send new email via nodemailer using payload
   * @param {EmailRequest} emailObject creation payload
   * @return {Promise<EmailResponse>}
   */
  public async sendEmail(emailObject: EmailRequest): Promise<EmailResponse> {
    const response: EmailResponse = { status: 'success', error: null };
    try {
      emailObject.from = 'Buy By <support@pharaohsoft.com>';

      //only for development
      const getTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.gmailFrom,
          pass: this.configService.gmailPassword,
        },
      });
      getTransporter.sendMail(emailObject);
    } catch (error) {
      response.status = 'failed';
      if (error.response) {
        response.error = error.response.body;
      } else {
        response.error = error.toString();
      }
    }

    return response;
  }
}
