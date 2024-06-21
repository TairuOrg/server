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
import { ExchangeRate, Revenue, ServerResponse } from '@/types/api/types';
import { ReportService } from '@/report/report.service';
import { CustomerService } from '@/customer/customer.service';

@Injectable()
export class AdminService {
  
  constructor(
    private readonly report: ReportService,
    private readonly user: UserService,
    private readonly prisma: PrismaService,
    private readonly currency: ExchangeService,
    private readonly cashier: CashierService,
    private readonly item: ItemsService,
    private readonly sale: SalesService,
    private readonly customer: CustomerService,
  ) {}

  async getAdminInfo(id: number): Promise<User> {
    return await this.user.getUser(id);
  }
  async getCashierStatus() {
    return await this.cashier.getCashierStatus();
  }
  async getTodaysRevenue(): Promise<ServerResponse<Revenue>> {
    const todaysRevenue = await this.sale.getTodaysRevenue();
    const foreignRevenue = await this.currency.convertCurrency(todaysRevenue);
    return {
      error: false,
      body: {
        message: 'Revenue for today',
        payload: {
          VE: { amount: foreignRevenue.body.payload.bs},
          US: { amount: todaysRevenue },
          EU: { amount: foreignRevenue.body.payload.euro },
        },
      },
    };
  }

  async getItemsAndCategoriesCount() {
    return await this.item.getItemsAndCategoriesCount();
  }

  test() {
    checkSameDate(new Date(), new Date());
    return true;
  }

  async convertExchange(amount: number) {
    return await this.currency.convertCurrency(amount);
  }

  async getItems() {
    return await this.item.findAll();
  }

  async getReports() {
    return await this.report.findAll();
  }

  async getCashiers() {
    return await this.cashier.findAll();
  }

  async getSales(){
    return await this.sale.findAll();
  }

  async getCustomers() {
    return await this.customer.findAll();
    }
  }
