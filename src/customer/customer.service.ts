import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Customer,
  UpdateCustomerData,
  ServerResponse,
  CustomerId,
} from '@/types/api/types';
import {
  nameRegExp,
  emailRegExp,
  phoneRegExp,
  idRegExp,
} from '@/types/api/regex';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import { Response } from 'express';
import { JWSSignatureVerificationFailed } from 'jose/dist/types/util/errors';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  async findAll(): Promise<ServerResponse<Customer[]>> {
    let customers: Customer[] = await this.prisma.customers.findMany({
      where: { is_deleted: false },
      select: {
        id: true,
        name: true,
        personal_id: true,
        phone_number: true,
        residence_location: true,
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

  async clientDataValidation(
    data: UpdateCustomerData,
    res: Response,
  ): Promise<Response> {
    const name = data.name;
    const personal_id = data.personal_id;
    const old_personal_id = data.old_personal_id;
    const phone_number = data.phone_number;
    const residence_location = data.residence_location;

    const id_validation = await this.prisma.customers.findUnique({
      where: { personal_id: personal_id },
    });

    const verify_deleted = await this.prisma.customers.findUnique({
      where: { personal_id: old_personal_id },
    });

    const verify_phone = await this.prisma.customers.findUnique({
      where: { phone_number: phone_number },
    });
    console.log("wtf",verify_phone)

    if (old_personal_id == null) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Cédula inválida',
            description: 'Debe ingresar la cédula del cliente a modificar',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    if (!nameRegExp.test(name) || name.length > 70 || name.length < 3) {
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
    } else if (
      !idRegExp.test(personal_id) ||
      personal_id.length > 10 ||
      personal_id.length < 8
    ) {
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
    } else if (!phoneRegExp.test(phone_number) || phone_number.length != 10) {
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
    
    else if(verify_phone && verify_phone.personal_id != old_personal_id){
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Número de teléfono ya registrado',
            description:
              'El número de teléfono ya se encuentra registrado en el sistema',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    else if (
      residence_location.length > 50 ||
      residence_location.length < 3
    ) {
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

    if (id_validation && (id_validation.personal_id != old_personal_id)) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Cédula ya registrada',
            description: 'La cédula ya se encuentra registrada en el sistema',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    } 
    if(verify_deleted && verify_deleted.is_deleted == true){
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'No se puede modificar este cajero',
            description: 'Este cajero está eliminado del sistema',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    else {
      return res.status(HttpStatus.OK).json({
        error: false,
        body: {
          message: 'Datos del cliente válidos',
        },
      });
    }
  }

  async updateCustomer(
    data: UpdateCustomerData,
    res: Response,
  ): Promise<Response> {
    try {
      console.log('yapping', data);
      const update_customer = await this.prisma.customers.update({
        where: { personal_id: data.old_personal_id },
        data: {
          name: data.name,
          personal_id: data.personal_id,
          phone_number: data.phone_number,
          residence_location: data.residence_location,
        },
      });
      console.log('yippie', update_customer);
      const response: AuthResponse = {
        error: false,
        body: {
          message: {
            title: 'Cliente Actualizado',
            description: 'El cliente ha sido actualizado satisfactoriamente',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Error al actualizar el cliente',
            description: 'Ha ocurrido un error al actualizar el cliente',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  async deleteCustomer(
    personal_id: CustomerId,
    res: Response,
  ): Promise<Response> {
    console.log('1', personal_id.personal_id);

    try {
      const customer = await this.prisma.customers.findUnique({
        where: { personal_id: personal_id.personal_id },
      });
      if (!customer) {
        const response: AuthResponse = {
          error: true,
          body: {
            message: {
              title: 'Cliente no encontrado',
              description:
                'El cliente no se encuentra registrado en el sistema',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else {
        const deletion = await this.prisma.customers.update({
          where: { personal_id: personal_id.personal_id },
          data: {
            is_deleted: true,
          },
        });
        const response: AuthResponse = {
          error: false,
          body: {
            message: {
              title: 'Cliente eliminado',
              description: 'Cliente eliminado satisfactoriamente',
              notificationStatus: NotificationStatus.SUCCESS,
            },
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Error al eliminar el cliente',
            description: 'Ha ocurrido un error al eliminar el cliente',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
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
