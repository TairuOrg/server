import { Controller, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/login';
import { encryptSessionCookie } from './lib';
import {
  AuthResponse,
  NotificationStatus,
  NotificationStatus as TYPE,
} from '@/types/api/Responses';
import { SignUpCode, ServerResponse, SignUpData } from '@/types/api/types';
import User from '@/user/dto/user';

import { Response } from 'express';
import { env } from 'node:process';
enum RoleOptions {
  ADMIN = 'admin',
  CASHIER = 'cashier',
}
interface RolesQueryParams {
  role: RoleOptions;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginAdmin(
    @Query() { role }: RolesQueryParams,
    @Body() cred: AuthCredentials,
    @Res() res: Response,
  ) {
    let user: User | null = null;
    let message: {
      title: string;
      description: string;
      notificationStatus: TYPE;
    } = {
      title: 'Inicio de sesión fallido',
      description: 'Credenciales inválidas',
      notificationStatus: NotificationStatus.ERROR,
    };

    if (!cred.email || !cred.password) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: true,
        body: {
          message,
        },
      });
    }
    switch (role) {
      case RoleOptions.ADMIN: {
        user = await this.authService.verifyAdmin(cred);
        if (user) {
          message = {
            title: 'Inicio de sesión del administrador satisfactorio',
            description: 'Te damos la bienvenida de vuelta',
            notificationStatus: NotificationStatus.SUCCESS,
          };
        }
        break;
      }

      case RoleOptions.CASHIER: {
        user = await this.authService.verifyCashier(cred);
        if (user) {
          message = {
            title: 'Inicio de sesión del cajero satisfactorio',
            description: 'Te damos la bienvenida de vuelta',
            notificationStatus: NotificationStatus.SUCCESS,
          };
        }
        break;
      }
      default:
        message = {
          title: 'Inicio de sesión fallido',
          description: 'Rol inválido',
          notificationStatus: NotificationStatus.ERROR,
        };
    }
    const sessionToken = await encryptSessionCookie({
      id: user?.id,
      role: 'admin',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });

    user && res.cookie('SESSION_TOKEN', sessionToken, { httpOnly: true });
    const response: AuthResponse = {
      error: !user,
      body: {
        userId: user?.id.toString(),
        message,
      },
    };

    const statusCode = user ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
    return res.status(statusCode).json(response);
  }

  @Post('signup-access') async signupAccess(
    @Body() code: SignUpCode,
    @Res() res: Response,
  ) {
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

  // type SignUpData = {
  //   personal_id: string;
  //   password: string;
  //   name: string;
  //   phone_number: string;
  //   email: string;
  //   residence_location: string;
  // }

  @Post('signup-validation') async signupValidation(@Body() data: SignUpData, @Res() res: Response) {
    const response = await this.authService.signupValidation(data, res);
    return response;
  }

  @Post('signup-insertion') async signupInsertion(@Body() data: SignUpData, @Res() res: Response) {
    const response = await this.authService.signupInsertion(data, res, RoleOptions.ADMIN);
    return response;
  }
}
