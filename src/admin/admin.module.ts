import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SessionMiddleware } from '@/middleware/session.middleware';
import { UserModule } from '@/user/user.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { ExchangeModule } from '@/exchange/exchange.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UserModule, PrismaModule, ExchangeModule],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(AdminController);
  }
}
