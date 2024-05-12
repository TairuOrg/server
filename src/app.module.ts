import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CashierController } from './cashier/cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrators } from './models/entities/Administrators';
import { Cashier } from './models/entities/Cashier';
import { Customers } from './models/entities/Customers';
import { Entries } from './models/entities/Entries';
import { EntriesItems } from './models/entities/EntriesItems';
import { Items } from './models/entities/Items';
import { Notifications } from './models/entities/Notifications';
import { Reports } from './models/entities/Reports';
import { Sales } from './models/entities/Sales';
import { SalesItems } from './models/entities/SalesItems';
import { SentNotifications } from './models/entities/SentNotifications';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pasta',
      database: 'tairu_db',

      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, AdminController, CashierController],
  providers: [AppService, AdminService],
})
export class AppModule {}
