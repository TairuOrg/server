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
        const response: AuthResponse = {
          error: true,
          body: {
            message: {
              title: 'Error al eliminar cajero',
              description: 'El cajero ingresado ya ha sido eliminado',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else {
        const deletedCashier = await this.prisma.user.update({
          where: { personal_id: personal_id.personal_id },
          data: { is_deleted: true, phone_number: null },
        });
        // Return the JSON representation of the data object
        const response: AuthResponse = {
          error: false,
          body: {
            message: {
              title: 'Cajero eliminado',
              description: 'El cajero ha sido eliminado satisfactoriamente',
              notificationStatus: NotificationStatus.SUCCESS,
            },
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      // Return the JSON representation of the data object

      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Error al eliminar cajero',
            description: 'El cajero no ha podido ser eliminado',
            notificationStatus: NotificationStatus.ERROR,
          },
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
}
