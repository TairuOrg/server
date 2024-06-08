import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthCredentials } from './dto/login';
import { PrismaService } from '@/prisma/prisma.service';

import User from '@/user/dto/user';
import { UserService } from '@/user/user.service';
import { SignUpData } from '@/types/api/types';
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

  async signup(data: SignUpData, res: Response): Promise<Response> {
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
            description:
              'Ya existe un usuario con esta cédula',
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
            description:
              'Ya existe un usuario con este número de teléfono',
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
}
