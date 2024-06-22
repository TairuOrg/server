import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { decryptSessionCookie } from '@/auth/lib';
import { CustomerId, UpdateCustomerData } from '@/types/api/types';
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
}
