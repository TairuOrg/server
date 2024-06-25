import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { ItemsModule } from '../items/items.module'
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService],
  imports: [PrismaModule, ItemsModule]
})
export class EntryModule {}
