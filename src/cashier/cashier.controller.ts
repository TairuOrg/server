import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CashierService } from './cashier.service';
import { Request } from 'express';
import { Response } from 'express';
import { decryptSessionCookie } from '@/auth/lib';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Get('me')
  async getCashierInfo(@Req() req: Request) {
    const session_token = req.headers.cookie?.split('=')[1];

    const [e, sessionParsed] = await decryptSessionCookie(session_token);
    if (e) return e;

    return await this.cashierService.getCashierInfo(sessionParsed.id as number);
  }

  @Get('items')
  async getItems(@Req() req: Request) {
    return this.cashierService.getItems();
  }

}
