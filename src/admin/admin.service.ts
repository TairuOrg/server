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
import { Customer, UpdateCustomerData, ExchangeRate, Revenue, ServerResponse, CustomerId, Item, UpdateItem, UserId, NotificationData } from '@/types/api/types';
import { ReportService } from '@/report/report.service';
import { CustomerService } from '@/customer/customer.service';
import { Response } from 'express';
import { NotificationService } from '@/notification/notification.service';

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
    private readonly notification: NotificationService,
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

  async deleteCashier(personal_id: UserId, res: Response) {
    return this.cashier.deleteCashier(personal_id, res);
  }

  async getSales(){
    return await this.sale.findAll();
  }

  async getCustomers() {
    return await this.customer.findAll();
    }

  async clientDataValidation(data:UpdateCustomerData, res: Response): Promise<Response> {
    return this.customer.clientDataValidation(data, res);
  }

  async clientUpdate(data:UpdateCustomerData, res: Response): Promise<Response> {
    return this.customer.updateCustomer(data, res);
  }

  async deleteCustomer(personal_id:CustomerId, res: Response): Promise<Response> {
    return this.customer.deleteCustomer(personal_id, res);
  }

  async validateItem(data:Item, res:Response) {
    return this.item.validate(data, res);
  }

  async insertItem(data: Item, res: Response) {
    return this.item.create(data, res);
  }

  async updateItem(data: UpdateItem, res:Response) {
    return this.item.update(data, res);
  }

  async insertNotification(data:NotificationData, res:Response) {
    return this.notification.insert(data, res);
  }
}
