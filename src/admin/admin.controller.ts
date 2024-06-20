import { Controller, Get, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { decryptSessionCookie } from '@/auth/lib';

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
    return this.adminService.getCashierStatus()
  }

  @Get('items-and-categories')
  async itemsAndCategories(@Req() req: Request) {
    return this.adminService.getItemsAndCategoriesCount()
  }

  @Get('todays-revenue')
  async todaysRevenue(@Req() req: Request) {
    return this.adminService.getTodaysRevenue()
  }


  @Get('convert-amount')
  async convertExchange(@Req() req:Request) {
    return this.adminService.convertExchange(2);
  }

  @Get('items')
  async getItems(@Req() req:Request) {
    return this.adminService.getItems();
  }

  @Get('reports')
  async getReports(@Req() req:Request) {
    return this.adminService.getReports();
  }

  @Get('cashiers')
  async getCashiers(@Req() req:Request) {
    return this.adminService.getCashiers();
  }

  @Get('sales') 
  async getSales(@Req() req:Request) {
    return this.adminService.getSales();
  }
}
