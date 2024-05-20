import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';
import { ExchangeService } from '@/exchange/exchange.service';
import { checkSameDate } from '@/utils/date-manager';

@Injectable()
export class AdminService {
  constructor(
    private readonly user: UserService,
    private readonly prisma: PrismaService,
    private readonly currency: ExchangeService,
  ) {}

  async getDashboardData(id: number): Promise<User> {
    const income = await this.currency.convertCurrency(1);
    console.log(income);
    return await this.user.getUser(id);
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

    //get today constants

    const todayRevenue = sales.reduce((acc, sale) => {
      //Check if the current sale dates from today

      if (checkSameDate(new Date(), sale.date)) {
        console.log('yeehaw');
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

  async getActiveCashiersCount(): Promise<string> {
    // Count active and inactive cashiers using Prisma queries
    const [activeCashiers, inactiveCashiers] = await Promise.all([
      this.prisma.cashier.count({
        where: { is_online: true },
      }),
      this.prisma.cashier.count({
        where: { is_online: false },
      }),
    ]);

    // Prepare the data object
    const cashierData = {
      active: activeCashiers,
      inactive: inactiveCashiers,
    };
    // Return the JSON representation of the data object
    return JSON.stringify(cashierData);
  }

  async getItemsAndCategoriesCount(): Promise<string> {
    const itemsCount = await this.prisma.items.count();
    const categoriesGroup = await this.prisma.items.groupBy({
      by: ['category_'],
    });
    const categoriesCount = categoriesGroup.length;
    const inventoryData = {
      item_count: itemsCount,
      categoryCount: categoriesCount,
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
