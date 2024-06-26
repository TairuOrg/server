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
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "Ya hay un artículo con ese código de barras en el inventario."
        },
      };

      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.barcode_id.length < 13 || validateData.barcode_id.length > 14 || !/\S/.test(validateData.barcode_id)) {
      
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "El código de barras del artículo es inválido."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.name.length < 1 || validateData.name.length > 70 || !/\S/.test(validateData.name)) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "El nombre del artículo es inválido."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.price < new Decimal(0.01) || validateData.price > new Decimal(9999.99)) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "El precio del artículo es inválido."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.category.length < 1 || validateData.category.length > 25 || !/\S/.test(validateData.category)) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "La categoría del artículo es inválida."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (validateData.manufacturer.length < 1 || validateData.manufacturer.length > 70 || !/\S/.test(validateData.manufacturer)) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "El proveedor del artículo es inválido."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (!Number.isInteger(validateData.quantity) || validateData.quantity < 0) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo inválido",
          payload: "La cantidad del artículo es inválida."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: ServerResponse<String> = {
      error: false,
      body: {
        message: "Artículo válido",
        payload: "Todos los datos del artículo son válidos."
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
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo no agregado",
          payload: "Ha ocurrido un error al agregar el artículo."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: ServerResponse<String> = {
      error: false,
      body: {
        message: "Artículo agregado",
        payload: "El artículo ha sido agregado satisfactoriamente."
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
    console.log(typeof updateData.quantity)
    try {
      await this.prisma.items.update({
        where: {
          barcode_id: updateData.old_barcode_id
        },
        data: {
          barcode_id: updateData.barcode_id,
          name: updateData.name,
          price: updateData.price,
          category: updateData.category,
          manufacturer: updateData.manufacturer,
          quantity: parseInt(updateData.quantity)
        },
      });
    } catch (error) {
      console.error(error)
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo no actualizado",
          payload: "Ha ocurrido un error al actualizar el artículo.",
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: ServerResponse<String> = {
      error: false,
      body: {
        message: 'Artículo actualizado',
        payload: 'El artículo ha sido actualizado satisfactoriamente.',
      },
    };
    
    return res.status(HttpStatus.OK).json(response);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
