import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Customer, ServerResponse } from '@/types/api/types';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService
  ) { }


  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll() : Promise<ServerResponse<Customer[]>>{
    let customers: Customer[] = await this.prisma.customers.findMany({
      select: {
        id: true,
        name: true,
        personal_id: true,
        phone_number: true,
        residence_location: true
      },
    });

    return {
      error: false,
      body: {
        message: 'Lista de los clientes del sistema',
        payload: customers,
      },
    };
    
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
