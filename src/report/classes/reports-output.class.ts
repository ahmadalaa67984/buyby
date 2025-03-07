export class CustomerOutput {
  cat: string;
  customerCount: number;
  AllCustomersCount: number;
  totalCount: number;
  date: string;
}
//done successfull
export class NoMovingOutput {
  cat: string;
  name: string;
  noMovingDays: number;
  lastTransaction: Date;
  itemCode: string;
  barCode: string;
  createdAt: Date;
}
//done successfully
export class SlowMovingOutput {
  cat: string;
  name: string;
  expectedMonthlyQtySold: number;
  actualMonthlyQtySold: number;
  itemCode: string;
  barCode: string;
  createdAt: Date;
}
//done successfuly
export class TopRecordsOutput {
  cat: string;
  name: string;
  count: number;
  value: number;
  itemCode: string;
  barCode: string;
  createdAt: Date;
}
//done successfuly
export class AvgBasketSizeOutput {
  count: number;
  avg: number;
  createdAt: Date;
}

export class GrossSalesOutput {
  cat: string;
  name: string;
  totalAmount: number;
  itemCode: string;
  barCode: string;
  createdAt: Date
}

export class LogsSystemDataOutput {
  email: string;
  role: string;
  action: string;
  date: Date;
  time: Date;
}
