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
      title: 'Login Failed',
      description: 'Invalid credentials',
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
            title: 'Admin login Successful',
            description: 'Welcome back',
            notificationStatus: NotificationStatus.SUCCESS,
          };
        }
        break;
      }

      case RoleOptions.CASHIER: {
        user = await this.authService.verifyCashier(cred);
        if (user) {
          message = {
            title: 'Cashier login Successful',
            description: 'Welcome back',
            notificationStatus: NotificationStatus.SUCCESS,
          };
        }
        break;
      }
      default:
        message = {
          title: 'Login Failed',
          description: 'Invalid role',
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
            title: 'Signup Code Accepted',
            description: 'The provided signup code was valid',
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
            title: 'Signup Code Invalid',
            description: 'The provided signup code was not valid',
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

  @Post('signup') async signup(
    @Body() data: SignUpData,
    @Res() res: Response,
  ) {
    let response: AuthResponse;
    const user = await this.authService.signup(data);
    if (user) {
      return res.status(HttpStatus.OK).json(response);
    } else {
      response = {
        error: true,
        body: {
          message: {
            title: 'Signup Failed',
            description: 'An error occurred while signing up',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }



}
