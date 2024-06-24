import { Controller, Post, Body, Query, Res, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/login';
import { encryptSessionCookie } from './lib';
import {
  AuthResponse,
  NotificationStatus,
  NotificationStatus as TYPE,
} from '@/types/api/Responses';
import {
  SignUpCode,
  ServerResponse,
  SignUpData,
  RoleOptions,
} from '@/types/api/types';
import User from '@/user/dto/user';

import { Response } from 'express';
import { env } from 'node:process';
import { idRegExp, nameRegExp, phoneRegExp } from '@/types/api/regex';

interface RolesQueryParams {
  role: RoleOptions;
}

//auth controller, inside of this controller, all the auth endpoints are defined and handled by
//the auth service
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //receives authcredentials (email and password) and a role as a query param,
  // then it checks if the given credentials
  //are valid, if they are, it returns a success message and a session token
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

  //receives the signup code and checks if it is valid, if it is, it returns a success message
  //the signup code is a confidential code that is given to a specific person, and allows them
  //to register new administrators
  @Post('signup-access') async signupAccess(
    @Body() code: SignUpCode,
    @Res() res: Response,
  ) {
    let response = await this.authService.signupCodeValidation(code, res);
    return response;
  }

  //Receives the data from the user and validates it, to check if the unique fields given are not used
  //by any other user in the database (email, personal_id, phone_number)
  @Post('signup-validation') async signupValidation(
    @Body() data: SignUpData,
    @Res() res: Response,
  ) {
    const response = await this.authService.signupValidation(data, res);
    return response;
  }

  //Receives the data from the user and inserts it into the database, creating a new admin
  // or cashier, depending on the given role
  @Post('signup-insertion') async signupInsertion(
    @Body() data: SignUpData,
    @Res() res: Response, 
  ) {
    const response = await this.authService.signupInsertion(data, res);
    return response;
  }

  @Post('logout') async logout(@Req() req: Request,@Res() res: Response) {
    res.clearCookie('SESSION_TOKEN');
    return res.status(HttpStatus.OK).json({
      error: false,
      body: {
        message: 'Sesión cerrada',
      },
    });
  }
}
