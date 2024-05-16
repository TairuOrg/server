import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import Admin from './entities/admin.entity'
import { CreateAdminDto } from './dto/create-admin.dto';
import { Sale } from '@/types/db/sales.interface';
// BASE_URL/admin?id=233
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {

  }

  @Get()
  findAllAdmins() {
    return 'si'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'so'
  }

  @Get('reports')
  findReports(): Promise<Sale[]> {
    return;
  }
  
}
