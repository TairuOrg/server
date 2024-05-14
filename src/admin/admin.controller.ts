import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import Admin from './entities/admin.entity'
import { CreateAdminDto } from './dto/create-admin.dto';
// BASE_URL/admin?id=233
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {

  }

  @Get()
  findAllAdmins(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Get('reports')
  findReports(): Promise<sales[]> {
    return;
  }
  
}
