import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry, ServerResponse } from '@/types/api/types';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEntryDto: CreateEntryDto) {
    return 'This action adds a new entry';
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
