import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [PrismaModule],
  exports: [NotificationService]
})
export class NotificationModule {}
