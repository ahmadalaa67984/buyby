import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RequestWithUser } from 'src/core/interfaces';
import { ReportDto } from '../report/dto/report.dto';
import {
  WarehouseStockItems,
  WarehouseStockItemsDoc,
} from 'src/stock-item-data/entities/stock-item.entity';
import { WasteTransactionService } from 'src/waste-transaction/waste-transaction.service';
import { BaseService } from 'src/core/shared';
import { Report, ReportDoc } from '../report/entities/report.entity';

@Injectable()
export class WasteItemService extends BaseService<ReportDoc> {
  constructor(
    @InjectModel(Report.name) readonly m: Model<ReportDoc>,
    @InjectModel(WarehouseStockItems.name)
    public readonly warehouseStockItems: Model<WarehouseStockItemsDoc>,
    private readonly wasteTransactionService: WasteTransactionService,
  ) {
    super(m);
  }

  async wastedItem(req: RequestWithUser, dto: ReportDto) {
    let aggregation = [];

    //item waste
    aggregation.push(
      {
        $addFields: {
          createdAtToString: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  createdAtToString: {
                    $gte: dto.filterByDateFrom,
                    $lte: dto.filterByDateTo,
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $project: {
          createdAtToString: 0,
        },
      },
      { $match: { entityId: { $eq: req.user.entityId } } },
      {
        $unwind: { path: '$items', preserveNullAndEmptyArrays: false },
      },

      {
        $group: {
          _id: '$items.stockItemId',
          count: { $sum: 1 },
          wasteQty: { $sum: '$items.wasteQty' },
          item: { $first: '$items.stockItemId' },
          date: { $push: '$createdAt' },
        },
      },
      {
        $unwind: { path: '$item', preserveNullAndEmptyArrays: false },
      },
      {
        // Get item data
        $lookup: {
          from: 'stockitems',
          localField: 'item',
          foreignField: '_id',
          as: 'item',
        },
      },

      {
        $lookup: {
          from: 'warehousestockitems',
          localField: 'item.warehouseStockItemsData',
          foreignField: '_id',
          as: 'warehousestockitem',
        },
      },

      {
        $project: {
          count: 1,
          wasteQty: 1,
          name: '$item.nameLocalized.mainLanguage',
          totalQty: '$warehousestockitem.qtyOnHand',
        },
      },
    );

    let wastedItemsData = await this.wasteTransactionService.m.aggregate(aggregation);

    let modifiedSubscriptions = [];
    wastedItemsData.forEach((data) => {
      let modifiedSubscription = {
        itemName: data.name[0],
        itemQty: data.totalQty[0],
        totalWaste: data.wasteQty,
        totalWasteOverItemQty: ((data.wasteQty / data.totalQty[0]) * 100).toFixed(0) + ' %',
      };

      modifiedSubscriptions.push(modifiedSubscription);
    });

    return { wastedItemsData: wastedItemsData };
  }
}
