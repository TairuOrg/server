import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import {
  ServerResponse,
  Item,
  ItemsAndCategoriesCount,
} from '@/types/api/types';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getItemsAndCategoriesCount(): Promise<
    ServerResponse<ItemsAndCategoriesCount>
  > {
    const itemsCount = await this.prisma.items.count();
    const categoriesGroup = await this.prisma.items.groupBy({
      by: ['category'],
    });
    const categoriesCount = categoriesGroup.length;

    return {
      error: false,
      body: {
        message: 'Items and categories count',
        payload: {
          items: itemsCount,
          categories: categoriesCount,
        },
      },
    };
  }

  async create(insertData: Item, res ): Promise<Response> {

    try {
      console.log(insertData)
      const hola = await this.prisma.items.create({
        data: {
          barcode_id: insertData.barcode_id,
          name: insertData.name,
          price: insertData.price,
          category: insertData.category,
          manufacturer: insertData.manufacturer,
          quantity: insertData.quantity
        },
      });

      console.log("bueno", hola);

      const response = {
        error: false,
        body: {
          message: {
            title: 'Artículo agregado',
            description: 'El artículo ha sido agregado satisfactoriamente',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      };
      return res.status(HttpStatus.OK).json(response);

    } catch (error) {
     
    }
    
  }

  async findAll(): Promise<ServerResponse<Item[]>> {
    // WTF
    const items: Item[] = await this.prisma.items.findMany({
      select: {
        barcode_id: true,
        name: true,
        price: true,
        category: true,
        manufacturer: true,
        quantity: true,
      },
    });

    return {
      error: false,
      body: {
        message: 'Lista de los productos en el inventario',
        payload: items,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
