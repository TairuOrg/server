import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import {
  ServerResponse,
  Item,
  UpdateItem,
  ItemsAndCategoriesCount,
  Barcode
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
  async validate(validateData: Item) {
    const itemExists = await this.prisma.items.findFirst({
      where: {
        barcode_id: validateData.barcode_id
      }
    });
    console.log(itemExists);

    if (itemExists) {
      return {
        successful: false,
        message: "El artículo ya existe en el inventario",
        item: null,
      };
    }

    if (validateData.barcode_id.length < 4 || validateData.barcode_id.length > 14 || !/\S/.test(validateData.barcode_id)) {
      return {
        successful: false,
        message: "El código de barras del artículo es inválido.",
        item: null,
      };
    }

    if (validateData.name.length < 1 || validateData.name.length > 70 || !/\S/.test(validateData.name)) {
      return {
        successful: false,
        message: "El nombre del artículo es inválido.",
        item: null,
      };
    }

    if (validateData.price < new Decimal(0.01) || validateData.price > new Decimal(9999.99)) {
      return {
        successful: false,
        message: "La categoría del ártículo es inválida.",
        item: null,
      };
    }

    if (validateData.category.length < 1 || validateData.category.length > 25 || !/\S/.test(validateData.category)) {
      return {
        successful: false,
        message: "La categoría del ártículo es inválida.",
        item: null,
      };
    }

    if (validateData.manufacturer.length < 1 || validateData.manufacturer.length > 70 || !/\S/.test(validateData.manufacturer)) {
      return {
        successful: false,
        message: "El proveedor del artículo es inválido.",
        item: null,
      };
    }

    if (!Number.isInteger(validateData.quantity) || validateData.quantity < 0) {
      return {
        successful: false,
        message: "La cantidad del artículo es inválida.",
        item: null,
      };
    }

    return {
      successful: true,
      message: "Todos los datos del artículo son válidos.",
      item: null,
    };
    
  }

  async create(insertData: Item) {
    const validationData = await this.validate(insertData);

    if (!validationData.successful) {
      return validationData;
    }
    let Item;
    console.log("insertData", insertData)
    console.log("barcode_id", insertData.barcode_id)
    console.log("name", insertData.name)
    console.log("price", insertData.price)
    console.log("category", insertData.category)
    console.log("manufacturer", insertData.manufacturer)
    console.log("quantity", insertData.quantity)
    try {
      Item = await this.prisma.items.create({
        data: {
          barcode_id: insertData.barcode_id,
          name: insertData.name,
          price: insertData.price,
          category: insertData.category,
          manufacturer: insertData.manufacturer,
          quantity: insertData.quantity
        },
      });
    } 
    catch (error) {
      console.log("error inserting: ", error)
      return {
        successful: false,
        message: "Ocurrio un error al crear el articulo",
        item: null,
      };
    }
    
    return {
      successful: true,
      message: "Articulo creado satisfactoriamente",
      item: Item,
    };
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

  async findOne(data: Barcode, res) {
    let Item;
    try {
      Item = await this.prisma.items.findUnique({
        where: {
          barcode_id: data.barcode_id
        }
      });
    }
    catch(error) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Error al buscar el artículo.",
          payload: "Ha ocurrido un error al buscar el artículo.",
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (!Item) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Artículo no encontrado",
          payload: "No se encontró ese artículo en los registros.",
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: ServerResponse<any> = {
      error: false,
      body: {
        message: "Artículo encontrado",
        payload: {
          barcode_id: Item.barcode_id,
          name: Item.name,
          quantity: Item.quantity
        }
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async update(updateData: UpdateItem, res) {
    console.log(typeof updateData.quantity)
    let itemExists;
    try { 
      itemExists = await this.prisma.items.findUnique({
        where: {barcode_id: updateData.barcode_id}
      })
    }
    catch(e) {
      const response = {
        error: true,
        body: {
          message: "Error",
          payload: "Hubo un error validando el artículo a ingresar.",
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
      }

    if (itemExists && itemExists.barcode_id !== updateData.old_barcode_id) {
      console.log("wtf")
      const response = {
        error: true,
        body: {
          message: "Error",
          payload: "El código de barras ya existe en el sistema.",
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    else {
      console.log("wa")
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
    
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
