import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { checkSameDate } from '@/utils/date-manager';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  
  async getTodaysRevenue(): Promise<number> {
 // Fetch all sales data, including related sales_items and items data
 const sales = await this.prisma.sales.findMany({
  include: {
    // Include the related sales_items data
    sales_items: {
      include: {
        // Further include the related items data
        items: true,
      },
    },
  },
});
console.log('sales', sales);
const todayRevenue = sales.reduce((acc, sale) => {
  //Check if the current sale dates from today

  if (checkSameDate(new Date(), sale.date)) {
    return (
      acc +
      sale.sales_items.reduce((itemAcc, saleItem) => {
        // Cast price to number for type safety (lmao, as if there was type safety in JS)
        const itemPrice = Number(saleItem.items.price);
        return itemAcc + saleItem.quantity * itemPrice;
      }, 0)
    );
  } else {
    return acc;
  }
}, 0);
return todayRevenue;
  }
  
}
