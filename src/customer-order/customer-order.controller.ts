import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/auth/interfaces/user-request.interface';
import { RoleGroups } from 'src/users/enums/roles.enum';
import { CustomerOrderService } from './customer-order.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';

@Controller('customer-order')
@ApiTags('customer-order')
export class CustomerOrderController {
  constructor(private readonly OrderService: CustomerOrderService) {}

  @Post('/me/create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS_CASHIER_CUSTOMER)
  @ApiBody({ type: CreateCustomerOrderDto })
  @ApiOperation({ summary: 'Create Order' })
  async create(
    @Body() dto: CreateCustomerOrderDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.OrderService.createOrder(req, dto);
  }

  @Get('me/findOne/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS_CASHIER_CUSTOMER)
  @ApiOperation({ summary: 'Get Order' })
  async getOrder(@Param('id') id: string, @Req() req: RequestWithUser) {
    return await this.OrderService.findOrder(req, id);
  }
}
