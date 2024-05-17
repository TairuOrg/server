import { Injectable } from '@nestjs/common';
import { AuthCredentials } from './dto/login';
import { PrismaService } from '@/prisma/prisma.service';

import User from '@/user/dto/user'; 
import { UserService } from '@/user/user.service';



@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private user: UserService) {}
  async verifyAdmin(cred: AuthCredentials): Promise<User> {
    const user = await this.user.findUser(cred.email, cred.password);
    
    if (!user) {
      return null;
    }
    const admin = await this.prisma.administrators.findUnique({
      where: {
        id: user.id,
      },
    });
    return admin ? user : null;
    }
  
  async verifyCashier(cred: AuthCredentials){
    return null
  }

  async logoutAdmin(id: string): Promise<any> {
    return 'unimplemented';
  }

  async logoutCashier(id: string): Promise<any> {
    return 'unimplemented';
  }
}
