import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '@/prisma/prisma.service';
import {
  Customer,
  UpdateCustomerData,
  ServerResponse,
  CustomerId,
  VerifyCustomer,
  CustomerData,
} from '@/types/api/types';
import {
  nameRegExp,
  emailRegExp,
  phoneRegExp,
  idRegExp,
} from '@/types/api/regex';
import { AuthResponse, NotificationStatus } from '@/types/api/Responses';
import { Response } from 'express';


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
    } else if (verify_phone && verify_phone.personal_id != old_personal_id) {
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
    } else if (
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

    if (id_validation && id_validation.personal_id != old_personal_id) {
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
    if (verify_deleted && verify_deleted.is_deleted == true) {
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
    } else {
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
      } else if (customer.is_deleted == true) {
        const response: AuthResponse = {
          error: true,
          body: {
            message: {
              title: 'Cliente eliminado previamente',
              description: 'Este cliente ya ha sido eliminado del sistema',
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
            phone_number: null,
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

  async verifyCustomer(personal_id: VerifyCustomer, res: Response) {
    try {
      const customer = await this.prisma.customers.findUnique({
        where: { personal_id: personal_id.personal_id },
      });

      if (customer && customer.is_deleted == false) {
        const response: AuthResponse = {
          error: false,
          body: {
            message: {
              title: 'Cliente encontrado',
              description: 'El cliente se encuentra registrado en el sistema',
              notificationStatus: NotificationStatus.SUCCESS,
            },
          },
        };
        return res.status(HttpStatus.OK).json(response);
      } else {
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
      }
    } catch (error) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Error al verificar el cliente',
            description: 'Ha ocurrido un error al verificar el cliente',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  async validateCustomer(data: CustomerData, res: Response) {
    try {
      const name = data.name;
      const personal_id = data.personal_id;
      const phone_number = data.phone_number;
      const residence_location = data.residence_location;

      const customer = await this.prisma.customers.findUnique({
        where: { personal_id: data.personal_id },
      });

      const verify_personal_id = await this.prisma.customers.findUnique({
        where: { personal_id: personal_id },
      });

      const verify_phone = await this.prisma.customers.findUnique({
        where: { phone_number: phone_number },
      });

      if (!nameRegExp.test(name) || name.length > 70 || name.length < 3) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Nombre inválido',
            payload:
              'El nombre no puede ser menor a 3 caracteres, mayor a 70, ni contener caracteres especiales o números',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (
        !idRegExp.test(personal_id) ||
        personal_id.length > 10 ||
        personal_id.length < 8
      ) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Cédula inválida',
            payload:
              'La cédula no puede ser menor a 8 caracteres, mayor a 10, ni contener caracteres especiales o letras',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (!phoneRegExp.test(phone_number) || phone_number.length != 10) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Número de teléfono inválido',
            payload:
              'El número de teléfono debe tener 10 dígitos y no contener caracteres especiales o letras',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (verify_personal_id && verify_personal_id.is_deleted == false) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Cédula ya registrada',
            payload: 'La cédula ya se encuentra registrada en el sistema',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (verify_phone) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Número de teléfono ya registrado',
            payload:
              'El número de teléfono ya se encuentra registrado en el sistema',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (
        residence_location.length > 50 ||
        residence_location.length < 3
      ) {
        const response: ServerResponse<String> = {
          error: true,
          body: {
            message: 'Dirección de residencia inválida',
            payload:
              'La dirección de residencia no puede ser menor a 3 caracteres, mayor a 50',
          },
        };
        return res.status(HttpStatus.BAD_REQUEST).json(response);
      } else {
        const response: ServerResponse<String> = {
          error: false,
          body: {
            message: 'Datos del cliente válidos',
            payload: 'Los datos del cliente son válidos para su inserción',
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      const response: ServerResponse<String> = {
        error: true,
        body: {
          message: 'Error al validar el cliente',
          payload: 'Ha ocurrido un error al validar el cliente',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  async insertCustomer(data: CustomerData, res:Response): Promise<Response> {
    try {

      const customer = await this.prisma.customers.findUnique({
        where: { personal_id: data.personal_id },
      });

      if (customer && customer.is_deleted == true) {
        const update_customer = await this.prisma.customers.update({
          where: { personal_id: data.personal_id },
          data: {
            is_deleted: false,
            phone_number: data.phone_number,
            name: data.name,
            residence_location: data.residence_location,
            personal_id: data.personal_id,
          },
        });
        const response: ServerResponse<String> = {
          error: false,
          body: {
            
              message: 'Usuario Reactivado',
              payload: 'El usuario se ha reactivado satisfactoriamente',
              
          
          },
        };
        return res.status(HttpStatus.OK).json(response);
      }
      else {
        const insert_customer = await this.prisma.customers.create({
          data: {
            name: data.name,
            personal_id: data.personal_id,
            phone_number: data.phone_number,
            residence_location: data.residence_location,
            is_deleted: false
          },
        });
        const response = {
          error: false,
          body: {
            message: 'Cliente registrado',
            payload: insert_customer
          }
        };
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      const response: AuthResponse = {
        error: true,
        body: {
          message: {
            title: 'Error al registrar el cliente',
            description: 'Ha ocurrido un error al registrar el cliente',
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
