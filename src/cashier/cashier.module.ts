import { Module } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CashierController } from './cashier.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';
import { ExchangeModule } from '@/exchange/exchange.module';
import { ItemsModule } from '@/items/items.module';
import { SalesModule } from '@/sales/sales.module';
import { ReportModule } from '@/report/report.module';
import { CustomerModule } from '@/customer/customer.module';
import { NotificationModule } from '@/notification/notification.module';
import { EntryModule } from '@/entry/entry.module';
import { AdminModule } from '@/admin/admin.module';

@Module({
  controllers: [CashierController],
  providers: [CashierService],
  imports: [UserModule, PrismaModule, ExchangeModule, ItemsModule, SalesModule, ReportModule, CustomerModule, NotificationModule, EntryModule],
  exports: [CashierService]
})
export class CashierModule {}
