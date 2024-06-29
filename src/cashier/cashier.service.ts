import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  CashierSummary,
  ServerResponse,
  CashierView,
  UserId,
  Item,
  VerifyCustomer,
  CustomerData,
  SaleData,
  AddItemData,
  RemoveItemData,
  FinishSaleData,
  SaleId,
  Barcode
} from '@/types/api/types';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import { Response } from 'express';
import { verify } from 'crypto';
import { UserService } from '@/user/user.service';
import { ItemsService } from '@/items/items.service';
import { SalesService } from '@/sales/sales.service';
import { CustomerService } from '@/customer/customer.service';
import { EntryService } from '@/entry/entry.service';
import { NotificationService } from '@/notification/notification.service';
import User from '@/user/dto/user';

@Injectable()
export class CashierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
    private readonly item: ItemsService,
    private readonly sale: SalesService,
    private readonly customer: CustomerService,
    private readonly notification: NotificationService,
    private readonly entry: EntryService,
  ) {}

  async getCashierInfo(id: number): Promise<User> {
    return await this.user.getUser(id);
  }
  async getCashierStatus(): Promise<ServerResponse<CashierSummary>> {
    // Count active and inactive cashiers using Prisma queries
    const [activeCashiers, inactiveCashiers] = await Promise.all([
      this.prisma.cashier.count({
        where: { is_online: true },
      }),
      this.prisma.cashier.count({
        where: { is_online: false },
      }),
    ]);
    // Return the JSON representation of the data object
    return {
      error: false,
      body: {
        message: 'Count of active and inactive cashiers',
        payload: {
          active_cashiers: activeCashiers,
          inactive_cashiers: inactiveCashiers,
        },
      },
    };
  }

  async getItems(): Promise<ServerResponse<Item[]>> {
    return await this.item.findAll();
  }

  async findAll(): Promise<ServerResponse<CashierView[]>> {
    const cashiers: CashierView[] = await this.prisma.cashier.findMany({
      select: {
        is_online: true,
        User: {
          select: {
            personal_id: true,
            name: true,
            phone_number: true,
            email: true,
            residence_location: true,
            is_deleted: true,
          },
        },
      },
    });

    return {
      error: false,
      body: {
        message: 'Lista de los cajeros del sistema.',
        payload: cashiers,
      },
    };
  }

  async deleteCashier(personal_id: UserId, res: Response): Promise<Response> {
    try {
      // Find the user with the given personal_id

      let verifyCashier = null;
      let user = null;
      user = await this.prisma.user.findUnique({
        where: { personal_id: personal_id.personal_id },
      });

      // Find the cashier with the given personal_id
      if (user) {
        verifyCashier = await this.prisma.cashier.findUnique({
          where: { id: user.id },
        });
      }

      if (verifyCashier === null) {
        const response: AuthResponse = {
          error: true,
          body: {
            message: {
              title: 'Error al eliminar cajero',
              description: 'El usuario ingresado no existe, o no es un cajero',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }

      // Check if the user is deleted
      if (user.is_deleted) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: "Error al eliminar el cajero",
            payload: "El cajero ya se encuentra eliminado."
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else {
        const deletedCashier = await this.prisma.user.update({
          where: { personal_id: personal_id.personal_id },
          data: { is_deleted: true, phone_number: "" }, // doesn't accept null, this is a workaround
        });
        // Return the JSON representation of the data object
        const response: ServerResponse<String> = {
          error: false,
          body: {
            message: "Cajero eliminado",
            payload: "El cajero ha sido eliminado satisfactoriamente."
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      // Return the JSON representation of the data object
      console.log(error)
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Error al eliminar el cajero",
          payload: "Ocurrió un error al eliminar el cajero."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  async verifyCustomer(personal_id: VerifyCustomer, res: Response) {
    // Find the customer with the given personal_id
    return await this.customer.verifyCustomer(personal_id, res);
  }

  async validateCustomer(data: CustomerData, res: Response) {
  return await this.customer.validateCustomer(data, res);
  }

  async insertCustomer(data: CustomerData, res: Response) {
    return await this.customer.insertCustomer(data,res);
  }

  async beginSale(data: SaleData, res) {
    return await this.sale.create(data, res);
  }

  async addItem(data: AddItemData, res) {
    return await this.sale.addItem(data,res);
  }

  async removeItem(data: RemoveItemData, res) {
    return await this.sale.removeItem(data, res);
  }

  async cancelSale(saleId: FinishSaleData, res) {
    return await this.sale.cancelSale(saleId, res);
  }

  async commitSale(saleId: FinishSaleData, res) {
    return await this.sale.commitSale(saleId, res);
  }

  async verifySale(data: SaleId, res) {
    return await this.sale.verifySale(data, res);
  }

  async getItem(data: Barcode, res) {
    return await this.item.findOne(data, res);
  }

  async getSaleItems(data: SaleId, res) {
    return await this.sale.getSalesItems(data, res);
  }
}
