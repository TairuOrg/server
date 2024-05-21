import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getItemsAndCategoriesCount(): Promise<string> {
    const itemsCount = await this.prisma.items.count();
    const categoriesGroup = await this.prisma.items.groupBy({
      by: ['category_'],
    });
    const categoriesCount = categoriesGroup.length;
    const inventoryData = {
      item_count: itemsCount,
      category_count: categoriesCount,
    };

    console.log(inventoryData);
    return JSON.stringify(inventoryData);
  }


  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
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
