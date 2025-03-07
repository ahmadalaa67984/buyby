import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WasteItemController } from './waste-item.controller';
import { WasteItemService } from './waste-item.service';
import { WarehouseStockItems, WarehouseStockItemsSchema } from 'src/stock-item-data/entities/stock-item.entity';
import { ReportModule } from 'src/report/report.module';
import { WasteTransactionModule } from 'src/waste-transaction/waste-transaction.module';
import { Report, ReportSchema } from '../report/entities/report.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: WarehouseStockItems.name, schema: WarehouseStockItemsSchema },
    ]),
    ReportModule,
    WasteTransactionModule,
  ],
  controllers: [WasteItemController],
  providers: [WasteItemService]
})
export class WasteItemModule {}