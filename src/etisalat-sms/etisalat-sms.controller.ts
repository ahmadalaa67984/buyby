import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, RoleGuard } from '../auth/guards';
import { RequestWithUser } from 'src/auth/interfaces/user-request.interface';
import { CreateEtisalatBulkSMS, CreateEtisalatSingleSMS } from './dto/etisalat-sms.dto';
import { EtisalatSMSService } from './etisalat-sms.service';
import { RoleGroups, RolesEnum } from 'src/users/enums/roles.enum';

@Controller('etisalat-sms')
@ApiTags('etisalat-sms')
export class EtisalatSMSController {
  constructor(private readonly EtisalatSMSService: EtisalatSMSService) {}

  @Post('me-sms')
  @ApiOperation({ summary: 'etisalat sms - send a single SMS' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS)
  EtisalatSMS(@Req() req: RequestWithUser, @Body() dto: CreateEtisalatSingleSMS) {
    return this.EtisalatSMSService.etisalatSMS(req, dto);
  }

  @Post('bulk-sms')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: 'etisalat sms - send a bulk SMS' })
  @HttpCode(HttpStatus.OK)
  EtisalatSMSBulk(@Req() req: RequestWithUser, @Body() dto: CreateEtisalatBulkSMS) {
    return this.EtisalatSMSService.bulkSMS(req, dto);
  }
}
