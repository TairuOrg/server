import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
  imports: [PrismaModule]
})
export class ReportModule {}
