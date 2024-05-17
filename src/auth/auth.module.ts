import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserModule } from '@/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, UserModule]
})
export class AuthModule {}
