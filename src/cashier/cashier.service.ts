import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CashierSummary } from '@/types/api/types';

@Injectable()
export class CashierService {
  constructor(private readonly prisma: PrismaService) {}
  async getActiveCashiersCount(): Promise<CashierSummary> {
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
      active_cashiers: activeCashiers,
      inactive_cashiers: inactiveCashiers,
    };
  }
}
