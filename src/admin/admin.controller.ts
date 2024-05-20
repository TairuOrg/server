import { Controller, Get, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { decryptSessionCookie } from '@/auth/lib';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async dashboardData(@Req() req: Request) {
    const session_token = req.headers.cookie?.split(';')[1].split('=')[1];
    const [e, sessionParsed] = await decryptSessionCookie(session_token);
    if (e) return e;

    return await this.adminService.getDashboardData(sessionParsed.id as number);
  }

  // @Get('test')
  // async getTodaysRevenue(@Req() req: Request) {
  //   return await this.adminService.getTodaysRevenue()
  // }

  @Get('test')
  async Test(@Req() req: Request) {
    return this.adminService.getItemsAndCategoriesCount();
  }
}
