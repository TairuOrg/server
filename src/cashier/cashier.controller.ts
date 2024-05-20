import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

}
