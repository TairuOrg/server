import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';
import { ExchangeService } from '@/exchange/exchange.service';
import { checkSameDate } from '@/utils/date-manager';
import { CashierService } from '@/cashier/cashier.service';
import { ItemsService } from '@/items/items.service';
import { SalesService } from '@/sales/sales.service';
import { 
  Customer, 
  UpdateCustomerData, 
  ExchangeRate, 
  Revenue, 
  ServerResponse, 
  CustomerId, 
  Item, 
  UpdateItem, 
  UserId, 
  NotificationData,
  Entry } from '@/types/api/types';
import { ReportService } from '@/report/report.service';
import { CustomerService } from '@/customer/customer.service';
import { Response } from 'express';
import { NotificationService } from '@/notification/notification.service';
import { EntryService } from '@/entry/entry.service';
import { promisify } from 'util';

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
    private readonly entry: EntryService
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
          VE: { amount: parseFloat(foreignRevenue.body.payload.bs.toFixed(2))},
          US: { amount: parseFloat(todaysRevenue.toFixed(2)) },
          EU: { amount: parseFloat(foreignRevenue.body.payload.euro.toFixed(2)) },
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

  async updateItem(data: UpdateItem, res:Response) {
    return this.item.update(data, res);
  }

  async insertNotification(data:NotificationData, res:Response) {
    return this.notification.insert(data, res);
  }

  async getNotifications() {
    return await this.notification.findAll();
  }

  async getEntries() {
    return await this.entry.findAll();
  }

  async insertEntry(data: Entry, res) {
    return await this.entry.create(data, res);
  }

  async validateEntry(data: Entry, res: Response) {
    return await this.entry.validate(data, res);
  }

  async getStatisics(data, res) {
    return await this.sale.getStatistics(data, res); 
  }

  async getDasboardData() {
    return await this.sale.getDashboardData();
  }

  
  

  async backupDatabase(filename = 'database_backup.sql') {
      const { env } = process; // Access environment variables
      const { exec } = require('child_process');
      // Construct the pg_dump command with connection details
      let pgDumpCommand = `pg_dump -h ${env.PGHOST} -U ${env.PGUSER} -d ${env.PGDATABASE} -f ${filename}`;
  
      // Execute the pg_dump command with error handling
      return new Promise((resolve, reject) => {
          exec(pgDumpCommand, (error, stdout, stderr) => {
              if (error) {
                  console.error('Error during database backup:', error);
                  reject(error);
                  return "error";
              }
              if (stderr) {
                  console.warn('Warnings from pg_dump:', stderr);
              }
              console.log('Database backup successful:', filename);
              resolve(filename);
              return filename;
           
          });
      });
  }

  // async restoreDatabase(filename = 'database_backup.sql') {
  //   const { env } = process; // Access environment variables
  //   const { exec } = require('child_process');
  //   // Construct the pg_dump command with connection details
  //   let pgDeleteCommand = `psql -U ${env.PGUSER} -d ${env.PGDATABASE} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`;
  //   let pgRestoreCommand = `psql tairu_db < ${filename}`;

  //   // Execute the pg_dump command with error handling
  //   return new Promise((resolve, reject) => {
  //       // exec(pgDeleteCommand, (error, stdout, stderr) => {
  //       //     if (error) {
  //       //         console.error('Error during database backup:', error);
  //       //         reject(error);
  //       //         return;
  //       //     }
  //       //     if (stderr) {
  //       //         console.warn('Warnings from pg_dump:', stderr);
  //       //     }
  //       //     console.log('Schema truncated successfully:', filename);
  //       //     resolve(filename)
         
  //       // });

  //       exec(pgRestoreCommand, (error, stdout, stderr) => {
  //           if (error) {
  //               console.error('Error during database backup:', error);
  //               reject(error);
  //               return;
  //           }
  //           if (stderr) {
  //               console.warn('Warnings from pg_dump:', stderr);
  //           }
  //           console.log('Database restore successful:', filename);
  //           resolve(filename);
         
  //       });
  //   });
  // }
  
  // Example usag
  
}
