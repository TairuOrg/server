import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CashierSummary, ServerResponse, CashierView } from '@/types/api/types';

@Injectable()
export class CashierService {
  constructor(private readonly prisma: PrismaService) {}
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
            residence_location: true
          }
        }
      }
    });
    
    return {
      error: false,
      body: {
        message: 'Lista de los cajeros del sistema.',
        payload: cashiers,
      },
    };
  }
}
