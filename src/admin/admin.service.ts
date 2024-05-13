
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaPromise } from '@prisma/client';
import Admin from './entities/admin.entity';
@Injectable()
export class AdminService {
  constructor(private Prisma: PrismaService) {}

  createAdmin(createAdminDto: CreateAdminDto) {
    return 'asdasdasd'
  }

  findAdministrator(): PrismaPromise<Admin[]> {
    return this.Prisma.administrators.findMany();
  }

  findOne(id: number): PrismaPromise<Admin> {
    return this.Prisma.administrators.findUnique({where: {id:id}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
