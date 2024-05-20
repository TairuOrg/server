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



@Module({
  imports: [PrismaModule, AuthModule, UserModule, AdminModule, ExchangeModule, SalesModule, CashierModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule { }
