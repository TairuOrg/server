import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';


@Module({
  controllers: [],
  providers: [ExchangeService],
  exports: [ExchangeService]
})
export class ExchangeModule {}
