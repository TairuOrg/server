import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Customer, CustomerData, ServerResponse } from '@/types/api/types';
import { nameRegExp, emailRegExp, phoneRegExp, idRegExp } from '@/types/api/regex';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import { Response } from 'express';

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


  async clientDataValidation(data:CustomerData, res:Response) : Promise<Response> {
    const name = data.name;
    const personal_id = data.personal_id;
    const phone_number = data.phone_number;
    const residence_location = data.residence_location;

    if(!nameRegExp.test(name) || name.length > 70 || name.length < 3) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Nombre inválido',
            description:
              'El nombre no puede ser menor a 3 caracteres, mayor a 70, ni contener caracteres especiales o números',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else if(!idRegExp.test(personal_id) || personal_id.length > 10 || personal_id.length < 8) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Cédula inválida',
            description:
              'La cédula no puede ser menor a 8 caracteres, mayor a 10, ni contener caracteres especiales o letras',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else if(!phoneRegExp.test(phone_number) || phone_number.length != 10) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Número de teléfono inválido',
            description:
              'El número de teléfono debe tener 10 dígitos y no contener caracteres especiales o letras',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else if(residence_location.length > 50 || residence_location.length < 3) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Dirección de residencia inválida',
            description:
              'La dirección de residencia no puede ser menor a 3 caracteres, mayor a 50',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    else{
      return res.status(HttpStatus.OK).json({
        error: false,
        body: {
          message: 'Datos del cliente válidos',
        },
      });
    }
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
