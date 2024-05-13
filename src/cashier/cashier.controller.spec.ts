import { Test, TestingModule } from '@nestjs/testing';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';

describe('CashierController', () => {
  let controller: CashierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashierController],
      providers: [CashierService],
    }).compile();

    controller = module.get<CashierController>(CashierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
