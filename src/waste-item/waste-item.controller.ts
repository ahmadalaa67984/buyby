import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RoleGroups } from 'src/users/enums/roles.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/core/interfaces';
import { ReportDto } from '../report/dto/report.dto';
import { WasteItemService } from './waste-item.service';

@ApiTags('Waste-items')
@Controller('waste-item')
export class WasteItemController {
  constructor(private readonly wasteItemService: WasteItemService) {}

  @Post('me/search')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.BUSSINESS)
  @ApiOperation({ summary: 'wasted item' })
  async wastedItem(@Req() req: RequestWithUser, @Body() dto: ReportDto) {
    return await this.wasteItemService.wastedItem(req, dto);
  }
}
