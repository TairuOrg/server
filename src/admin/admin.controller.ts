import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('dashboard')
    async renderDashboard(): Promise<any> {
        return await this.adminService.getAllAdmins();
    }
}
