import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Controller('cashier')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Post()
  create(@Body() createCashierDto: CreateCashierDto) {
    return this.cashierService.create(createCashierDto);
  }

  @Get()
  findAll() {
    return this.cashierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashierService.update(+id, updateCashierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashierService.remove(+id);
  }
}
