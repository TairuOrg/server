import { Injectable } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';

@Injectable()
export class CashierService {
  create(createCashierDto: CreateCashierDto) {
    return 'This action adds a new cashier';
  }

  findAll() {
    return `This action returns all cashier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashier`;
  }

  update(id: number, updateCashierDto: UpdateCashierDto) {
    return `This action updates a #${id} cashier`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashier`;
  }
}
