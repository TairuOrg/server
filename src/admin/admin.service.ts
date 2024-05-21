import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';
import { ExchangeService } from '@/exchange/exchange.service';
import { checkSameDate } from '@/utils/date-manager';
import { CashierService } from '@/cashier/cashier.service';
import { ItemsService } from '@/items/items.service';
import { SalesService } from '@/sales/sales.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly user: UserService,
    private readonly prisma: PrismaService,
    private readonly currency: ExchangeService,
    private readonly cashier: CashierService,
    private readonly item: ItemsService,
    private readonly sale: SalesService
  ) {}

  async getAdminInfo(id: number): Promise<User> {
    return await this.user.getUser(id);
  }
  async getCashierStatus() {
    return await this.cashier.getCashierStatus();
  }
  async getTodaysRevenue() {
   return await this.sale.getTodaysRevenue();
  }

  async getItemsAndCategoriesCount() {
    return await this.item.getItemsAndCategoriesCount();
  }

  test() {
    checkSameDate(new Date(), new Date());
    return true;
  }
}
