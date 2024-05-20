import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';
import { ExchangeService } from '@/exchange/exchange.service';
import { checkSameDate } from '@/utils/date-manager';
import { CashierService } from '@/cashier/cashier.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly user: UserService,
    private readonly prisma: PrismaService,
    private readonly currency: ExchangeService,
    private readonly cashier: CashierService,
  ) {}

  async getAdminInfo(id: number): Promise<User> {
    return await this.user.getUser(id);
  }
  async getCashierStatus() {
    return await this.cashier.getCashierStatus();
  }
  async getTodaysRevenue(): Promise<number> {
    // Fetch all sales data, including related sales_items and items data
    const sales = await this.prisma.sales.findMany({
      include: {
        // Include the related sales_items data
        sales_items: {
          include: {
            // Further include the related items data
            items: true,
          },
        },
      },
    });

    const todayRevenue = sales.reduce((acc, sale) => {
      //Check if the current sale dates from today

      if (checkSameDate(new Date(), sale.date)) {
        return (
          acc +
          sale.sales_items.reduce((itemAcc, saleItem) => {
            // Cast price to number for type safety (lmao, as if there was type safety in JS)
            const itemPrice = Number(saleItem.items.price);
            return itemAcc + saleItem.quantity * itemPrice;
          }, 0)
        );
      } else {
        return acc;
      }
    }, 0);
    return todayRevenue;
  }

  async getItemsAndCategoriesCount(): Promise<string> {
    const itemsCount = await this.prisma.items.count();
    const categoriesGroup = await this.prisma.items.groupBy({
      by: ['category_'],
    });
    const categoriesCount = categoriesGroup.length;
    const inventoryData = {
      item_count: itemsCount,
      category_count: categoriesCount,
    };

    console.log(inventoryData);
    return JSON.stringify(inventoryData);
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  test() {
    checkSameDate(new Date(), new Date());
    return true;
  }
}
