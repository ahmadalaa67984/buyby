import { Test, TestingModule } from '@nestjs/testing';
import { WasteItemController } from './waste-item.controller';

describe('WasteItemController', () => {
  let controller: WasteItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WasteItemController],
    }).compile();

    controller = module.get<WasteItemController>(WasteItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
