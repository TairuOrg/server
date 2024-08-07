import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ExchangeModule } from './exchange/exchange.module';
import { SalesModule } from './sales/sales.module';
import { CashierModule } from './cashier/cashier.module';
import { ItemsModule } from './items/items.module';
import { ReportModule } from './report/report.module';
import { NotificationModule } from './notification/notification.module';
import { EntryModule } from './entry/entry.module';
import { CustomerModule } from './customer/customer.module';
import { MailModule } from './mail/mail.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';



@Module({
  imports: [PrismaModule, AuthModule, UserModule, AdminModule, ExchangeModule, SalesModule, CashierModule, ItemsModule, ReportModule, NotificationModule, EntryModule, CustomerModule, MailModule, DbModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule { }
