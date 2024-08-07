import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry, EntryItem, Item, ServerResponse, UpdateItem } from '@/types/api/types';
import { NotificationStatus } from '@/types/api/Responses'
import { ItemsService } from '@/items/items.service'
import { PrismaService } from '@/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class EntryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly item: ItemsService,
  ) {}

  async create(insertData: Entry, res) {
    let Entry;
    console.log('entry para agregar:', insertData)
    try {
      Entry = await this.prisma.entries.create({
        data: {
          admin_id: insertData.admin_id,
          description: insertData.description,
        }
      });
    } catch (error) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Entrada de artículos no registrada",
          payload: "Ocurrió un error al registrar la entrada de artículos."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    
    return await this.addItemsToEntry(insertData.entries_items, Entry.id, res);
  } 

  async addItemsToEntry(Items: EntryItem[], EntryId, res) {
    let has_error = false;
    console.log('dasdasdasds', Items)
    console.log("idd",EntryId)
    for (let Item of Items) {
      console.log("wat da heeel", Item)
      try {
        const itemExists = await this.prisma.items.findUnique({
          where: {
            barcode_id: Item.barcode_id
          },
        });
        console.log('existe el item o no:',itemExists);
        if (!itemExists) {
          console.log("seguro?",itemExists)
          const creation = await this.item.create({
            barcode_id: Item.barcode_id,
            name: Item.name,
            price: Item.price,
            category: Item.category,
            manufacturer: Item.manufacturer,
            quantity: 0,
          });
          console.log("creacion",creation)

          if (!creation.successful) {
            const response: ServerResponse<String> = {
              error: true,
              body: {
                message: "Entrada de artículos no registrada",
                payload: creation.message
              },
            };
            return res.status(HttpStatus.BAD_REQUEST).json(response);
          }
          console.log('diavlazo',creation.message);

          Item.item_id = creation.item.id;
        }

        const entryItem = await this.prisma.items.findUnique({
          where: {
            barcode_id: Item.barcode_id
          },
          select: {
            quantity: true,
            id: true
          }
        });

        console.log("entry id", EntryId);
        console.log("item id", Item.item_id);
        console.log("item id ahora si", entryItem.id);
        console.log("quantity", Item.add_quantity);
        await this.prisma.entries_items.create({
          data: {
            entry_id: EntryId,
            item_id: entryItem.id,
            quantity: Item.add_quantity,
          }
        });



        await this.prisma.items.update({
          where: {
            id: entryItem.id
          },
          data: {
            quantity: entryItem.quantity + Item.add_quantity
          }
          }
        );
      }
      catch(error) {
        console.log(error);
        has_error = true;
        break;
      }
    }
    if(has_error){
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Entrada de artículos no registrada",
          payload: "Ocurrió un error al registrar un artículo de la entrada de artículos."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const response: ServerResponse<String> = {
      error: false,
      body: {
        message: "Entrada de artículos registrada",
        payload: "La entrada de artículos ha sido registrada de manera satisfactoria."
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async findAll(): Promise<ServerResponse<any>> {
    try{
      const entries = await this.prisma.entries.findMany({
        select: {
          id: true,
          admin_id: true,
          description: true,
          date: true,
          entries_items: {
            select: {            
              item_id: true,
              quantity: true,
              items: {
                select: {
                  barcode_id:true,
                  name:true,
                  price:true,
                  category:true,
                  manufacturer:true,
  
                }
              }
               // Include all selected fields from the nested items relation
            },
          },
        },
      });
  
      return {
        error: false,
        body:{
          message:"Lista de las entradas del sistema",
          payload:entries
        }
      }
    }
    catch(error){
      return {
        error:true,
        body:{
          message:"Error al obtener las entradas",
          payload:error
        }
      }
    }
    
  }

  async validate(data: Entry, res: Response) {
    const verify_admin = await this.prisma.administrators.findUnique({
      where: {
        id: data.admin_id
      }
    });

    if(!verify_admin){
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Entrada de artículos no registrada",
          payload: "El administrador no existe."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else if (data.entries_items.length == 0){
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Entrada de artículos no registrada",
          payload: "La entrada no tiene artículos."
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else if (data.description.length < 3 || data.description.length > 200){
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: "Entrada de artículos no registrada",
          payload: "La descripción de la entrada no puede ser menor a 3 caracteres, ni mayor a 200"
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    for (const Item of data.entries_items) {
      const verify_item = await this.prisma.items.findFirst({where: {id: Item.item_id}});
      if(!verify_item){
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: "Entrada de artículos no registrada",
            payload: "Uno de los artículos no existe."
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
      else if (Item.add_quantity < 1){
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: "Entrada de artículos no registrada",
            payload: "La cantidad de uno de los artículos no puede ser menor a 1."
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      }
 
      }
      const response : ServerResponse<String> = {
        error: false,
        body: {
          message: "Entrada de artículos válida",
          payload: "Los datos de la entrada son válidos."
        },
      };
      return res.status(HttpStatus.OK).json(response);
    
  }

  findOne(id: number) {
    return `This action returns a #${id} entry`;
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
