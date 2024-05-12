import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CashierController } from './cashier/cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// typeorm-model-generator -d postgres -h localhost -u postgres -x pasta  -p 5432 -e postgres -s public -o src/models

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
    })
  ],
  controllers: [AppController, AdminController, CashierController],
  providers: [AppService, AdminService],
})
export class AppModule {}
