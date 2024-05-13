import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaPromise } from '@prisma/client';
import Admin from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private Prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      await this.Prisma.administrators.create({ data: createAdminDto });
      return { success: true, message: 'Administrator created successfully' };
    } catch (error) {
      return { success: false, message: 'Error creating administrator', error };
    }
  }

  findAll(): PrismaPromise<Admin[]> {
    return this.Prisma.administrators.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

}
