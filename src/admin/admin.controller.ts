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
  async Test(@Req() req: Request) {
    return this.adminService.getCashierStatus()
  }
}
