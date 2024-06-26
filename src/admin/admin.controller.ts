import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { decryptSessionCookie } from '@/auth/lib';
import { CustomerId, UpdateCustomerData, Item, UpdateItem, NotificationData, Entry } from '@/types/api/types';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  async getAdminInfo(@Req() req: Request) {
    const session_token = req.headers.cookie?.split('=')[1];

    const [e, sessionParsed] = await decryptSessionCookie(session_token);
    if (e) return e;

    return await this.adminService.getAdminInfo(sessionParsed.id as number);
  }

  @Get('cashier-status')
  async cashierStatus(@Req() req: Request) {
    return this.adminService.getCashierStatus();
  }

  @Get('items-and-categories')
  async itemsAndCategories(@Req() req: Request) {
    return this.adminService.getItemsAndCategoriesCount();
  }

  @Get('todays-revenue')
  async todaysRevenue(@Req() req: Request) {
    return this.adminService.getTodaysRevenue();
  }

  @Get('convert-amount')
  async convertExchange(@Req() req: Request) {
    return this.adminService.convertExchange(2);
  }

  @Get('get-items')
  async getItems(@Req() req: Request) {
    return this.adminService.getItems();
  }

  @Get('get-reports')
  async getReports(@Req() req: Request) {
    return this.adminService.getReports();
  }

  @Get('get-cashiers')
  async getCashiers(@Req() req: Request) {
    return this.adminService.getCashiers();
  }

  @Post('delete-cashier')
  async deleteCashier(@Body() personal_id: CustomerId, @Res() res: Response) {
    return this.adminService.deleteCashier(personal_id, res);
  }
  
  @Get('get-sales')
  async getSales(@Req() req: Request) {
    return this.adminService.getSales();
  }

  @Get('get-customers')
  async getCustomers(@Req() req: Request) {
    return this.adminService.getCustomers();
  }
  

  @Post('client-data-validation')
  async clientDataValidation(@Body() data: UpdateCustomerData, @Res() res: Response) {
    const response = await this.adminService.clientDataValidation(data, res);
    return response;
  }

  @Post('client-update')
  async clientUpdate(@Body() data: UpdateCustomerData, @Res() res: Response) {
    const response = await this.adminService.clientUpdate(data, res);
    return response;
  }

  @Post('client-delete')
  async deleteCustomer(@Body() personal_id: CustomerId, @Res() res: Response) {
    const response = await this.adminService.deleteCustomer(personal_id, res);
    return response;
  }

  @Post('validate-item')
  async validateItem(@Body() data: Item, @Res() res: Response) {
    const response = await this.adminService.validateItem(data, res);
    return response;
  }

  @Post('insert-item')
  async insertItem(@Body() data: Item, @Res() res: Response) {
    const response = await this.adminService.insertItem(data, res);
    return response;
  }
  @Post('update-item')
  async updateItem(@Body() data: UpdateItem, @Res() res: Response) {
    console.log(data)
    const response = await this.adminService.updateItem(data, res);
    return response;
  }

  @Post('insert-notification')
  async validateNotification(@Body() data: NotificationData, @Res() res: Response) {
    const response = await this.adminService.insertNotification(data, res);
    return response;
  }

  @Get('get-notifications')
  async getNotifications(@Req() req: Request) {
    return this.adminService.getNotifications();
  }

  @Get('get-entries') 
  async getEntries(@Req() req: Request) {
    return this.adminService.getEntries();
  }

  @Post('insert-entry')
  async insertEntry(@Body() data: Entry, @Res() res: Response) {
    const response = await this.adminService.insertEntry(data, res);
    return response;
  }

  // @Post('validate-entries')
  // async validateEntry(@Body() data: any, @Res() res: Response) {
  //   return this.adminService.validateEntry(data, res);
  // }

  @Post('validate-entry') 
  async validateEntry(@Body() data: Entry, @Res() res: Response) {
    const response = await this.adminService.validateEntry(data, res);
    return response;
  }
}
