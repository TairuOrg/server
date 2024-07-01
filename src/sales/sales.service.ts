import { HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { checkSameDate } from '@/utils/date-manager';
import {
  ServerResponse,
  Sale,
  SaleData,
  AddItemData,
  RemoveItemData,
  FinishSaleData,
  SaleId,
  FullSaleData,
  Item,
  getStatisticsData,
  Statistics,
  DashboardData
} from '@/types/api/types';
import { Response } from 'express';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async isCompleted(sale_id) {
    const sale = await this.prisma.sales.findUnique({
      where: {
        id: sale_id,
      },
      select: {
        is_completed: true,
      },
    });
    if (sale === null) {
      return true;
    }
    return sale.is_completed;
  }

  async create(insertData: SaleData, res): Promise<ServerResponse<number>> {
    let Sale;
    try {
      const customer = await this.prisma.customers.findUnique({
        where: {
          personal_id: insertData.customer_personal_id,
        },
        select: {
          id: true,
        },
      });
      console.log('el cliente es:', customer);

      const onGoingSale = await this.prisma.sales.findFirst({
        where: {
          customer_id: customer.id,
          is_completed: false
        },
        select: {
          id: true
        }
      });

      if (onGoingSale) {
        const response = {
          error: false,
          body: {
            message: 'Falta por concretar una venta con el cliente',
            payload: onGoingSale.id,
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }

      Sale = await this.prisma.sales.create({
        data: {
          cashier_id: insertData.cashier_id,
          customer_id: customer.id,
          is_completed: false,
        },
      });
    } catch (error) {
      console.log(error);
      const response = {
        error: true,
        body: {
          message: 'Venta no creada',
          payload: undefined,
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta creada',
        payload: Sale.id,
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async addItem(data: AddItemData, res) {
    try {
      if (await this.isCompleted(parseInt(data.sale_id))) {
        const response = {
          error: true,
          body: {
            message: 'Artículo no añadido',
            payload:
              'La venta ya ha sido concretada, no se pueden añadir artículos a ella.',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }

      let Item = await this.prisma.items.findUnique({
        where: {
          barcode_id: data.item_barcode_id,
        },
        select: {
          id: true,
          quantity: true,
        },
      });
      let quantity = parseInt(data.quantity);

      let isAdded = await this.prisma.sales_items.findFirst({
        where: {
          item_id: Item.id,
          sale_id: parseInt(data.sale_id)
        },
        select: {
          id: true,
          quantity: true,
        }
      });

      if (Item.quantity - quantity < 0) {
        const response = {
          error: true,
          body: {
            message: 'Artículo no añadido',
            payload: 'No hay suficientes unidades disponibles del artículo.',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
      else if (parseInt(data.quantity) < 1) {
        const response = {
          error: true,
          body: {
            message: 'Artículo no añadido',
            payload: 'No se puede agregar un artículo con cantidad de 0.',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }

      if (isAdded) {
        await this.prisma.sales_items.update({
          where: {
            id: isAdded.id,
          },
          data: {
            quantity: quantity
          }
        });
      }
      else {
        await this.prisma.sales_items.create({
        data: {
          item_id: Item.id,
          sale_id: parseInt(data.sale_id),
          quantity: parseInt(data.quantity),
        },
      });
      }
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Artículo no añadido',
          payload: 'Ha ocurrido un error al añadir el artículo a la venta.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Artículo añadido',
        payload: 'El artículo ha sido añadido a la venta satisfactoriamente.',
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async removeItem(data: RemoveItemData, res) {
    try {
      if (await this.isCompleted(parseInt(data.sale_id))) {
        const response = {
          error: true,
          body: {
            message: 'Artículo no eliminado',
            payload:
              'La venta ya ha sido concretada, no se pueden eliminar artículos de ella.',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }

      let Item = await this.prisma.items.findUnique({
        where: {
          barcode_id: data.item_barcode_id,
        },
        select: {
          id: true,
        },
      });

      let ItemEntry = await this.prisma.sales_items.findFirst({
        where: {
          sale_id: parseInt(data.sale_id),
          item_id: Item.id,
        },
        select: {
          id: true,
        },
      });

      await this.prisma.sales_items.delete({
        where: {
          id: ItemEntry.id,
        },
      });
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Artículo no eliminado',
          payload: 'Ha ocurrido un error al eliminar el artículo a la venta.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Artículo eliminado',
        payload: 'EL artículo ha sido eliminado a la venta satisfactoriamente.',
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async cancelSale(data: FinishSaleData, res) {
    const saleId = parseInt(data.sale_id);

    try {
      if (!(await this.isCompleted(saleId))) {
        await this.prisma.sales_items.deleteMany({
          where: {
            sale_id: saleId,
          },
        });

        await this.prisma.sales.delete({
          where: {
            id: saleId,
          },
        });
      } else {
        const response = {
          error: true,
          body: {
            message: 'Venta no cancelada',
            payload:
              'La venta fue concretada anteriormente, no se puede cancelar.',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Venta no cancelada',
          payload: 'Ha ocurrido un error al cancelar la venta.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta cancelada',
        payload: 'La venta ha sido cancelada satisfactoriamente.',
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async commitSale(data: FinishSaleData, res) {
    const saleId = parseInt(data.sale_id);

    try {
      if (await this.isCompleted(saleId)) {
        const response = {
          error: true,
          body: {
            message: 'Venta no concretada',
            payload: 'La venta ya ha sido concretada.',
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
      const commitSale = await this.prisma.sales.findUnique({
        where: {
          id: saleId
        },
        select: {
          sales_items: true
        }
      });
      console.log(commitSale.sales_items.length)
      if(commitSale.sales_items.length === 0) {
        const response = {
          error: true,
          body: {
            message: 'Venta no concretada',
            payload: 'No se puede culminar una venta sin articulos.',
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }

      await this.prisma.sales.update({
        where: {
          id: saleId,
        },
        data: {
          is_completed: true,
        },
      });
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Venta no concretada',
          payload: 'Ocurrió un error al concretar la venta.',
        },
      };
      return res.status(HttpStatus.OK).json(response);
    }
    const items = await this.prisma.sales_items.findMany({
      where: {
        sale_id: saleId,
      },
      select: {
        item_id: true,
        quantity: true,
        items: {
          select: {
            quantity: true,
          },
        },
      },
    });

    const itemsSubstracted = await this.substractToItems(items);

    if (!itemsSubstracted) {
      const response = {
        error: true,
        body: {
          message: 'Venta no concretada',
          payload: 'Ocurrio un error al concretar la venta.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response = {
      error: false,
      body: {
        message: 'Venta concretada',
        payload: 'La venta ha sido concretada de manera satisfactoria.',
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async substractToItems(items) {
    let hasError = false;
    for (const item of items) {
      try {
        await this.prisma.items.update({
          data: {
            quantity: item.items.quantity - item.quantity,
          },
          where: {
            id: item.item_id,
          },
        });
      } catch (error) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      return false;
    }

    return true;
  }

  async findAll(): Promise<ServerResponse<Sale[]>> {
    const sales: Sale[] = await this.prisma.sales.findMany({
      select: {
        id: true,
        cashier_id: true,
        customer_id: true,
        date: true,
        is_completed: true,
      },
    });
    return {
      error: false,
      body: {
        message: 'Lista de todas las ventas',
        payload: sales,
      },
    };
  }

  async verifySale(
    data: SaleId,
    res,
  ): Promise<ServerResponse<FullSaleData> | ServerResponse<String>> {
    let sale_id = parseInt(data.sale_id);

    if (Number.isNaN(sale_id) || sale_id === undefined || sale_id === null) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: 'Venta no encontrada',
          payload: 'Id de venta no válido',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    try {
      const sale = await this.prisma.sales.findUnique({
        where: {
          id: sale_id,
        },
        select: {
          id: true,
          cashier_id: true,
          customer_id: true,
          is_completed: true,
        },
      });

      if (sale && !sale.is_completed) {
        const customer = await this.prisma.customers.findUnique({
          where: { id: sale.customer_id },
          select: {
            name: true,
          },
        });

        const cashier = await this.prisma.user.findUnique({
          where: {
            id: sale.cashier_id,
          },
          select: {
            name: true,
          },
        });

        const json: FullSaleData = {
          sale_id: sale.id,
          is_completed: sale.is_completed,
          cashier_name: cashier.name,
          customer_name: customer.name,
        };

        const response: ServerResponse<FullSaleData> = {
          error: false,
          body: {
            message: 'Venta encontrada',
            payload: json,
          },
        };
        return res.status(HttpStatus.OK).json(response);
      } else {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Venta no encontrada',
            payload: 'La venta no existe o ya ha sido completada',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
    } catch (error) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: 'Venta no encontrada',
          payload: 'La venta no existe o ya ha sido completada',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
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

  async getDashboardData() {
    let thisWeekData: number[] = [];
    let pastWeekData: number[] = [];
    let date = new Date();
    let upperRange = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let lowerRange;

    for (let i = 0; i < 14; i++) {
      date.setDate(date.getDate() - 1);
      lowerRange = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(upperRange + "\n" + lowerRange)
      const data = await this.prisma.sales.count({
        where: {
          date: {
            lte: new Date(upperRange),
            gte: new Date(lowerRange),
          },
          is_completed: true
        }
      });
      console.log("data ", data);
      if (i < 7) {
        thisWeekData[i] = data;
        console.log("week " + i + " data: " + thisWeekData[i]);
      }
      else {
        pastWeekData[i - 7] = data;
        console.log("week " + i + "data: " + pastWeekData[i]);
      }
    
      upperRange = lowerRange;
    }

    const response: ServerResponse<DashboardData> = {
      error: false,
      body: {
        message: 'Estadisticas de ventas de las ultimas semanas',
        payload: {
          thisWeekSales: thisWeekData,
          pastWeekSales: pastWeekData
        },
      },
    }

    return response;
  }

  getRange(frequency) {
    let date = new Date();

    switch(frequency) {
      case "Este mes": {
        date.setDate(date.getDate() - 31);
        break;
      }
      case "Hoy": {
        date.setDate(date.getDate() - 1);
        break;
      }
      case "Este año": {
        date.setDate(date.getDate() - 364);
        break;
      }
    }
    //const trailer = `T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}+${date.getMilliseconds()}`;
    //today += trailer;
    //range += trailer;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; 
  }

  async getSalesAmount(frequency) {
    const range = this.getRange(frequency); 

    return await this.prisma.sales.count({
      where: {
        date: {
          gte: new Date(range),
        },
        is_completed: true
      }
    });
  }

  async getSalesTotal(frequency) {
    const range = this.getRange(frequency);

    let sales = await this.prisma.sales.findMany({
      where: {
        date : {
          gte: new Date(range),
        },
        is_completed: true
      },

      select: {
        sales_items: {
          select: {
            quantity: true,
            items: {
              select: {
                price: true
              }
            }
          }
        }
      }
    });
    let salesSum = 0; 
    for (let sale of sales) {
      for (let sales_item of sale.sales_items) {
        salesSum += sales_item.quantity * sales_item.items.price.toNumber();
      }
    }
    return salesSum;
  }

  async getSalesAverage(frequency) {
    return await this.getSalesTotal(frequency) / await this.getSalesAmount(frequency);
  }

  async topTenMostSoldItems(frequency) {
    let range = this.getRange(frequency);
    //Don't change this typing. They will kill you
    const results: any[] = await this.prisma.$queryRaw`
    select
      i.name,
      i.category, 
      count(i.id) as item_count, 
      sum(si.quantity) as total_sold, 
      i.price,
      sum(si.quantity) * i.price as total_income
    from 
      sales s 
      inner join sales_items si on s.id = si.sale_id
      inner join items i on si.item_id = i.id
    where
      s.is_completed = true and
      date > ${new Date(range)}
    group by i.id
    order by total_income desc
    limit 10;
  `;

    for (const result of results) {
      result.item_count = Number(result.item_count);
      result.total_sold = Number(result.total_sold);
    }

    return results;
  }

  async topTenMostSoldCategories(frequency) {
    let range = this.getRange(frequency);
    //Don't change this typing. They will kill you
    const results: any[] = await this.prisma.$queryRaw`
      select 
        sub.category, 
        count(sub.category), 
        sum(sub.total_sold) as total_sold, 
        sum(sub.total_income) as total_income
      from
        (
          select
            i.category as category,
            si.quantity as total_sold,
            si.quantity * i.price as total_income
          from 
            sales s 
            inner join sales_items si on s.id = si.sale_id
            inner join items i on si.item_id = i.id
          where
            s.is_completed = true and
            date > ${new Date(range)}
        ) sub
      group by sub.category
      order by total_income desc
      limit 10;
    `;

    for (const result of results) {
      result.count = Number(result.item_count);
      result.total_sold = Number(result.total_sold);
    }

    return results;
  }

  async getStatistics(data: getStatisticsData, res) {

    const content: Statistics = {
      salesAmount: null,
      salesTotal: null,
      salesAverage: null,
      topTenItems: null,
      topTenCategories: null
    };

    for (const stat of data.statistics) {
      switch (stat) {
        case "Cantidad de Ventas": {
          content.salesAmount = await this.getSalesAmount(data.frequency);
          break;
        }
        case "Ganancia total de ventas": {
          content.salesTotal = await this.getSalesTotal(data.frequency);
          break;
        }
        case "Promedio de monto de ventas": {
          content.salesAverage = await this.getSalesAverage(data.frequency);
          break;
        }
        case "Top 10 articulos mas vendidos": {
          content.topTenItems = await this.topTenMostSoldItems(data.frequency);
          break;
        }
        case "Top 10 categorias mas vendidas": {
          content.topTenCategories = await this.topTenMostSoldCategories(data.frequency);
          break;
        }
      }
    }

    const response: ServerResponse<Statistics> = {
      error: false,
        body: {
          message: 'Lista de estadisticas',
          payload: content
        },
    }
    
    return res.status(HttpStatus.OK).json(response);
  }

  async getSalesItems(sale_id: SaleId, res: Response) {
    let saleItems;
    let saleId:number;
    try {
      saleId = parseInt(sale_id.sale_id);
    }
    catch{
      const response = {
        error: true,
        body: {
          message: 'Venta no encontrada',
          payload: 'Id de venta no válido',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    try {
      saleItems = await this.prisma.sales_items.findMany({
        where: {
          sale_id: saleId,
        },
        select: {
          item_id: true,
          quantity: true,
          items: {
            select: {
              barcode_id: true,
              name: true,
              price: true,
              category: true,
              manufacturer: true,
              quantity: true,
            },
          },
        },
      });
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Artículos no encontrados',
          payload: 'Ha ocurrido un error al buscar los artículos de la venta.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    console.log('sdasdasd', saleItems);
    const response = {
      error: false,
      body: {
        message: 'Artículos encontrados',
        payload: saleItems,
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
