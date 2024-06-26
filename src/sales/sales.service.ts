import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { checkSameDate } from '@/utils/date-manager';
import { ServerResponse, Sale, SaleData } from '@/types/api/types';

@Injectable()   
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(insertData: SaleData, res): Promise<ServerResponse<number>> {
    let Sale;
    try {
      const customer = await this.prisma.customers.findUnique({
        where: {
          personal_id: insertData.customer_personal_id
        },
        select: {
          id: true
        }
      });

      Sale = await this.prisma.sales.create({
        data: {
          cashier_id: insertData.cashier_id,
          customer_id: customer.id,
          is_completed: false,
        }
      });
    } 
    catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Venta no creada',
          payload: undefined,
        }
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta creada',
        payload: Sale.id,
      }
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async addItem(data, res) {
    try {
      let Item = await this.prisma.items.findUnique({
        where: {
          barcode_id: data.item_barcode_id
        },
        select: {
          id: true
        }
      });

      await this.prisma.sales_items.create({
        data: {
          item_id: Item.id,
          sale_id: data.sale_id,
          quantity: data.quantity
        }
      });
    }
    catch (error) {
      console.log(error);
      const response = {
        error: true,
        body: {
          message: 'Artículo no añadido',
          payload: "Ha ocurrido un error al añadir el artículo a la venta.",
        }
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Artículo añadido',
        payload: "El artículo ha sido añadido a la venta satisfactoriamente.",
      }
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async removeItem(data, res) {
    try {
      let Item = await this.prisma.items.findUnique({
        where: {
          barcode_id: data.item_barcode_id
        },
        select: {
          id: true
        }
      });

      let ItemEntry = await this.prisma.sales_items.findFirst({
        where: {
          sale_id: data.sale_id,
          item_id: Item.id
        },
        select: {
          id: true
        }
      });

      await this.prisma.sales_items.delete({
        where: {
         id: ItemEntry.id
        }
      });
    }
    catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Artículo no eliminado',
          payload: "Ha ocurrido un error al eliminar el artículo a la venta.",
        }
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Artículo eliminado',
        payload: "EL artículo ha sido eliminado a la venta satisfactoriamente.",
      }
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async cancelSale(saleId, res) {
    try {
      let sale = await this.prisma.sales.findUnique({
        where: {
          id: saleId.sale_id
        },
        select: {
          is_completed: true
        }
      });
      
      if (!sale.is_completed) {
        await this.prisma.sales_items.deleteMany({
          where: {
            sale_id: saleId.sale_id
          }
        });
  
        await this.prisma.sales.delete({
          where: {
            id: saleId.sale_id
          }
        });
      }
      else {
        const response = {
          error: true,
          body: {
            message: 'Venta no cancelada',
            payload: "La venta fue concretada anteriormente, no se puede cancelar.",
          }
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
    }
    catch (error) {
      console.log(error);
      const response = {
        error: true,
        body: {
          message: 'Venta no cancelada',
          payload: "Ha ocurrido un error al cancelar la venta.",
        }
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta cancelada',
        payload: "La venta ha sido cancelada satisfactoriamente.",
      }
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async commitSale(saleId, res) {
    try {
      await this.prisma.sales.update({
        where: {
          id: saleId.sale_id
        },
        data: {
          is_completed: true,
        }
      });
    }
    catch(error) {
      const response = {
        error: true,
        body: {
          message: 'Venta no concretada',
          payload: "Ocurrió un error al concretar la venta."
        }
      }
      return res.status(HttpStatus.OK).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta concretada',
        payload: "La venta ha sido concretada de manera satisfactoria."
      }
    }
    return res.status(HttpStatus.OK).json(response);
  }

  async substractToItems(Items) {
    
  }

  async findAll(): Promise<ServerResponse<Sale[]>> {
    const sales : Sale[] = await this.prisma.sales.findMany({
      select: {
        id: true,
        cashier_id: true,
        customer_id: true,
        date: true,
        is_completed: true
      },
    });
    return {
      error: false,
      body: {
        message: 'Lista de todas las ventas',
        payload: sales,
      }
    }
  }
  
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
