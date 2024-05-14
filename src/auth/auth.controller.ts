import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/login';
import {
  AuthResponse,
  NotificationStatus,
  NotificationStatus as TYPE,
} from '@/types/api/Responses';
import Admin from '@/admin/entities/admin.entity';
import Cashier from '@/types/db/cashier.interface';

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
  ): Promise<AuthResponse> {
    let user: Admin | Cashier | null = null;
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
      return {
        error: true,
        body: {
          message,
        },
      };
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
    return {
      error: !user,
      body: {
        userId: user?.id.toString(),
        message,
      },
    };
  }

  @Post('logout')
  async logoutAdmin(
    @Query() { role }: RolesQueryParams,
    @Body() userId: any,
  ): Promise<AuthResponse> {
    switch (role) {
      case RoleOptions.ADMIN: {
        const userToLogOut = await this.authService.logoutAdmin(userId);
        return userToLogOut
          ? {
              error: false,
              body: {
                userId: 'something here, probably coming off from logout Admin',
                message: {
                  title: 'Logged out',
                  description: 'Successfully logged out',
                  notificationStatus: 'success',
                },
              },
            }
          : {
              error: true,
              body: {
                message: {
                  title: "Couldn't log out",
                  description:
                    "Can't use the auth service at the moment, contact the system administrator",
                  notificationStatus: 'error',
                },
              },
            };
      }
      case RoleOptions.CASHIER: {
        const userToLogOut = await this.authService.logoutAdmin(userId);
        return userToLogOut
          ? {
              error: false,
              body: {
                userId: 'something here, probably coming off from logoutAdmin',
                message: {
                  title: 'Logged out',
                  description: 'Successfully logged out',
                  notificationStatus: 'success',
                },
              },
            }
          : {
              error: true,
              body: {
                message: {
                  title: "Couldn't log out",
                  description:
                    "Can't use the auth service at the moment, contact the system administrator",
                  notificationStatus: 'error',
                },
              },
            };
      }
      default:
        return;
    }
  }
}
