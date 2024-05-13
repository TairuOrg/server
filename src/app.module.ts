import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashierController } from './cashier/cashier.controller';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { CashierModule } from './cashier/cashier.module';


@Module({
  imports: [AdminModule, PrismaModule, CashierModule],
  controllers: [AppController, CashierController],
  providers: [AppService ],
})
export class AppModule {
  constructor() {}
}
