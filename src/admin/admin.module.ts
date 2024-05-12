import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PrismaModule],
})
export class AdminModule {}
