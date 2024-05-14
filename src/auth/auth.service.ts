import { Injectable } from '@nestjs/common';
import { AuthCredentials } from './dto/login';
import { PrismaService } from '@/prisma/prisma.service';
import Admin from '@/admin/entities/admin.entity';
import Cashier from '@/types/db/cashier.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async verifyAdmin(cred: AuthCredentials): Promise<Admin> {
    return await this.prisma.administrators.findFirst({
      where: {
        email: cred.email,
        password: cred.password,
      },
    });
  }
  async verifyCashier(cred: AuthCredentials): Promise<Cashier> {
    const result = await this.prisma.cashier.findFirst({
      where: {
        email: cred.email, // Use the email from cred
        password: cred.password, // Use the password from cred
      },
    });

    return result;
  }

  async logoutAdmin(id: string): Promise<any> {
    return 'unimplemented';
  }

  async logoutCashier(id: string): Promise<any> {
    return 'unimplemented';
  }
}
