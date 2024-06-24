import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import {
  ServerResponse,
  Item,
  UpdateItem,
  ItemsAndCategoriesCount,
} from '@/types/api/types';
import { Decimal } from '@prisma/client/runtime/library';

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
  async validate(validateData: Item, res): Promise<Response> {
    const itemExists = await this.prisma.items.findFirst({
      where: {
        barcode_id: validateData.barcode_id
      }
    });
    console.log(itemExists);

    if (itemExists) {
      const response: AuthResponse = {
        error: false,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'Ya existe un artículo con ese código de barras',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };

      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.barcode_id.length < 13 || validateData.barcode_id.length > 14 || !/\S/.test(validateData.barcode_id)) {
      
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'El código de barras del artículo es inválido.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.name.length < 1 || validateData.name.length > 70 || !/\S/.test(validateData.name)) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'El nombre del artículo es inválido.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.price < new Decimal(0.01) || validateData.price > new Decimal(9999.99)) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'El precio del artículo es inválido.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.category.length < 1 || validateData.category.length > 25 || !/\S/.test(validateData.category)) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'La categoría del artículo es inválido.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.manufacturer.length < 1 || validateData.manufacturer.length > 70 || !/\S/.test(validateData.manufacturer)) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'El proveedor del articulo es inválido.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (!Number.isInteger(validateData.quantity) || validateData.quantity < 0) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Artículo inválido',
            description: 'La cantidad ingresada para el artículo es inválida.',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: AuthResponse = {
      error: false,
      body: {
        message: {
          title: 'Artículo válido',
          description: 'Todos los datos del artículo son válidos.',
          notificationStatus: NotificationStatus.SUCCESS,
        },
      },
    };
    return res.status(HttpStatus.BAD_REQUEST).json(response);
  }

  async create(insertData: Item, res): Promise<Response> {
    try {
      await this.prisma.items.create({
        data: {
          barcode_id: insertData.barcode_id,
          name: insertData.name,
          price: insertData.price,
          category: insertData.category,
          manufacturer: insertData.manufacturer,
          quantity: insertData.quantity
        },
      });
    } catch (error) {
      const response: AuthResponse =  {
        error: true,
        body: {
          message: {
            title: 'Artículo no agregado',
            description: 'Ha ocurrido un error al agregar el artículo',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: AuthResponse = {
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

  async update(updateData: UpdateItem, res) {
    try {
      await this.prisma.items.update({
        where: {
          barcode_id: updateData.old_barcode_id
        },
        data: {
          barcode_id: updateData.new_barcode_id,
          name: updateData.name,
          price: updateData.price,
          category: updateData.category,
          manufacturer: updateData.manufacturer,
          quantity: updateData.quantity
        },
      });
    } catch (error) {
      const response: AuthResponse =  {
        error: true,
        body: {
          message: {
            title: 'Artículo no actualizado',
            description: 'Ha ocurrido un error al actualizar el artículo',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: AuthResponse = {
      error: false,
      body: {
        message: {
          title: 'Artículo actualizado',
          description: 'El artículo ha sido actualizado satisfactoriamente',
          notificationStatus: NotificationStatus.SUCCESS,
        },
      },
    };
    
    return res.status(HttpStatus.OK).json(response);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
