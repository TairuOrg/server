import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
  imports: [PrismaModule]
})
export class EntryModule {}
