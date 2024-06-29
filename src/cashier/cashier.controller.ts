import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { CashierService } from './cashier.service';
import { Request } from 'express';
import { Response } from 'express';
import { decryptSessionCookie } from '@/auth/lib';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { CustomerData, VerifyCustomer, SaleData, AddItemData, RemoveItemData, FinishSaleData, FullSaleData, SaleId, Barcode } from '@/types/api/types';

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

  @Post('verify-customer')
  async verifyCustomer(@Body() personal_id: VerifyCustomer, @Res() res: Response) { 
    console.log('verificar cliente:', personal_id)
    return this.cashierService.verifyCustomer(personal_id, res);
  } 

  @Post('validate-customer')
  async validateCustomer(@Body() data: CustomerData, @Res() res: Response) {
    console.log('buscar cliente:', data)
    return this.cashierService.validateCustomer(data, res);
  }
  
  @Post('insert-customer') 
  async insertCustomer(@Body() data: CustomerData, @Res() res: Response) {
    console.log('insertar cliente:', data)
    return this.cashierService.insertCustomer(data, res);
  }

  @Post('begin-sale')
  async beginSale(@Body() data: SaleData, @Res() res: Response) {
    console.log('iniciar venta:', data)
    const response = await this.cashierService.beginSale(data, res);
    console.log('response:', response)
    return response;
  }

  @Post('add-item')
  async addItem(@Body() data: AddItemData, @Res() res: Response) {
    return this.cashierService.addItem(data, res);
  }

  @Post('remove-item')
  async removeItem(@Body() data: RemoveItemData, @Res() res: Response) {
    return this.cashierService.removeItem(data, res);
  }

  @Post('cancel-sale')
  async cancelSale(@Body() data: FinishSaleData, @Res() res: Response) {
    return this.cashierService.cancelSale(data, res);
  }

  @Post('commit-sale')
  async commitSale(@Body() data: FinishSaleData, @Res() res: Response) {
    return this.cashierService.commitSale(data, res);
  }

  @Post('verify-sale')
  async verifySale(@Body() data: SaleId, @Res() res: Response) {
    return this.cashierService.verifySale(data, res);

  }
  @Post('get-item')
  async getItem(@Body() data: Barcode, @Res() res: Response) {
    return this.cashierService.getItem(data, res);
  }

  @Post('get-sale-items')
  async getSaleItems(@Body() data: SaleId, @Res() res: Response) {
    return this.cashierService.getSaleItems(data, res);
  }
}
