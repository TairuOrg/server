import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaPromise } from '@prisma/client';
import Admin from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private Prisma: PrismaService) {}


}
