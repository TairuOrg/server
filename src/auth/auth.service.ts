import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthCredentials } from './dto/login';
import { PrismaService } from '@/prisma/prisma.service';

import User from '@/user/dto/user';
import { UserService } from '@/user/user.service';
import { SignUpData, RoleOptions, SignUpCode } from '@/types/api/types';
import { NotificationStatus, AuthResponse } from '@/types/api/Responses';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}
  async verifyAdmin(cred: AuthCredentials): Promise<User> {
    const user = await this.user.findUser(cred.email, cred.password);

    if (!user) {
      return null;
    }
    const admin = await this.prisma.administrators.findUnique({
      where: {
        id: user.id,
      },
    });
    return admin ? user : null;
  }

  async verifyCashier(cred: AuthCredentials) {
    return null;
  }

  async logoutAdmin(id: string): Promise<any> {
    return 'unimplemented';
  }

  async logoutCashier(id: string): Promise<any> {
    return 'unimplemented';
  }

  async signupValidation(data: SignUpData, res: Response): Promise<Response> {
    const personal_id = data.personal_id;
    const email = data.email;
    const phone_number = data.phone_number;

    let response: AuthResponse;

    const db_email = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const db_personal_id = await this.prisma.user.findUnique({
      where: {
        personal_id: personal_id,
      },
    });

    const db_phone_number = await this.prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });

    if (db_personal_id) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Cédula inválida',
            description: 'Ya existe un usuario con esta cédula',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    } else if (db_email) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Correo electrónico inválido',
            description: 'Ya existe un usuario con este correo electrónico',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    } else if (db_phone_number) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Número de teléfono inválido',
            description: 'Ya existe un usuario con este número de teléfono',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    } else {
      response = {
        error: false,
        body: {
          message: {
            title: 'Información de registro válida',
            description: 'la información suministrada es válida',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      };
      return res.status(HttpStatus.OK).json(response);
    }
  }

  async signupInsertion(data: SignUpData, res: Response): Promise<Response> {
    try {
      //se inserta el usuario en la base de datos
      console.log('ghrui', data.role);
      const insert_user = await this.prisma.user.create({
        data: {
          personal_id: data.personal_id,
          password: data.password,
          name: data.name,
          phone_number: data.phone_number,
          email: data.email,
          residence_location: data.residence_location,
        },
      });
      //se busca el usuario recien insertado, con el fin de poder obtener el id autoincremental de la base de datos
      const user_data = await this.prisma.user.findUnique({
        where: {
          personal_id: data.personal_id,
        },
      });

      //se verifica el rol del usuario, para insertarlo como un administrador de ser necesario
      if (data.role === RoleOptions.ADMIN) {
        const insert_admin = await this.prisma.administrators.create({
          data: {
            User: {
              connect: {
                id: user_data.id,
              },
            },
          },
        });
      }
      //se verifica el rol del usuario, para insertarlo como un cajero de ser necesario
      if (data.role === RoleOptions.CASHIER) {
        const insert_cashier = await this.prisma.cashier.create({
          data: {
            User: {
              connect: {
                id: user_data.id,
              },
            },
          },
        });
      }
      //se retorna la respuesta de exito
      return res.status(HttpStatus.OK).json({
        error: false,
        body: {
          message: {
            title: 'Usuario insertado correctamente',
            description:
              'Se insertó el usuario correctamente en la base de datos',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      });
      //en caso de error, se retorna la respuesta de error
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: true,
        body: {
          message: {
            title: 'Error al insertar usuario',
            description:
              'Ocurrió un error al insertar el usuario en la base de datos',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      });
    }
  }
  async signupCodeValidation(
    code: SignUpCode,
    res: Response,
  ): Promise<Response> {
    let response: AuthResponse;
    if (code.code === process.env.SU_TOKEN) {
      response = {
        error: false,
        body: {
          message: {
            title: 'Código de registro válido',
            description: 'El código de registro suministrado es válido',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      };
      return res.status(HttpStatus.OK).json(response);
    } else {
      response = {
        error: true,
        body: {
          message: {
            title: 'Código de registro inválido',
            description: 'El código de registro suministrado es inválido',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
  }
}
