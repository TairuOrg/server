import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';
import { ExchangeService } from '@/exchange/exchange.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly user: UserService,
    private readonly prisma: PrismaService,
    private readonly currency: ExchangeService,
  ) {}
  async getDashboardData(id: number): Promise<User> {
    const income = await this.currency.convertCurrency(1);
    console.log(income)
    return await this.user.getUser(id);
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
