import {
  BadGatewayException,
  Body,
  Headers,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/auth/interfaces/user-request.interface';
import { RoleGroups } from 'src/users/enums/roles.enum';
import { PaymentService } from './payment.service';
import { InvoiceItemsDTO } from './dto/invoice-items.dto';
import { UpdatePackageTypeDto } from 'src/subscribtion/dtos/update-package-type.dto';
import { UpdatePackageExtraLimitDto } from 'src/subscribtion/dtos/update-package-extra-limit.dto';
import { CreateCustomerOrderDto } from 'src/customer-order/dto/create-customer-order.dto';

@Controller('payment/me')
@ApiTags('Fawry payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay-subscription')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS)
  @ApiOperation({ summary: 'pay for a subscription' })
  async paySubscription(
    @Req() req: RequestWithUser,
    @Body() dto: InvoiceItemsDTO,
  ) {
    return this.paymentService.paySubscription(req, dto);
  }

  // @Post('pay-change-package')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(...RoleGroups.BUSSINESS)
  // @ApiOperation({ summary: 'pay for changing package' })
  // async PayChangePackage(
  //   @Req() req: RequestWithUser,
  //   @Body() dto: UpdatePackageTypeDto,
  // ) {
  //   return this.paymentService.payChangePackage(req, dto);
  // }

  @Post('pay-extra-limit')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS)
  @ApiOperation({ summary: 'pay for changing package' })
  async PayExtraUser(
    @Req() req: RequestWithUser,
    @Body() dto: UpdatePackageExtraLimitDto,
  ) {
    return this.paymentService.payExtraUser(req, dto);
  }

  @Post('pay-customer-order/:id')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(...RoleGroups.BUSSINESS_CASHIER_CUSTOMER)
  @ApiOperation({ summary: 'pay customer order by orderId' })
  async payCustomerOrder(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.paymentService.payCustomerOrder(req, id);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'webhook return payment Status' })
  // @UseGuards(JwtAuthGuard)
  async handleWebhook(@Body() payload: any) {
    // You can access the request payload and perform necessary actions
    // Send a response back to the webhook provider

    return this.paymentService.handleWebhook(payload);
  }

  @Get('verfiy')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'payment Status' })
  async verifyPayment(@Req() req: RequestWithUser) {
    return this.paymentService.getPaymentStatus(req);
  }
}
