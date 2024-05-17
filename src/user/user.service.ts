import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import User from '@/user/dto/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return {
      id: user.id,
      personal_id: user.personal_id,
      name: user.name,
      phone_number: user.phone_number,
      email: user.email,
      residence_location: user.residence_location,
    };
  }

  async findUser(email: string, password: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
  }
}

