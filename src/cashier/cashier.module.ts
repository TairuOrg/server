import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [CashierController],
  providers: [CashierService],
  imports: [PrismaModule],
  exports: [CashierService]
})
export class CashierModule {}
