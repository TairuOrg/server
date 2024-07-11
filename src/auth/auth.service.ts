import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthCredentials } from './dto/login';
import { PrismaService } from '@/prisma/prisma.service';

import User from '@/user/dto/user';
import { UserService } from '@/user/user.service';
import {
  SignUpData,
  RoleOptions,
  SignUpCode,
  EditUserData,
  RestorePassword,
} from '@/types/api/types';
import { NotificationStatus, AuthResponse } from '@/types/api/Responses';
import { Response } from 'express';
import {
  emailRegExp,
  idRegExp,
  nameRegExp,
  phoneRegExp,
} from '@/types/api/regex';
import { MailService } from '@/mail/mail.service';
import { DbService } from '@/db/db.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private mailService: MailService,
    private db: DbService,
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

  async verifyCashier(cred: AuthCredentials): Promise<User> {
    const user = await this.user.findUser(cred.email, cred.password);

    if (!user || user.is_deleted) {
      return null;
    }
    const cashier = await this.prisma.cashier.findUnique({
      where: {
        id: user.id,
      },
    });
    return cashier ? user : null;
  }

  async logoutAdmin(id: string): Promise<any> {
    return 'unimplemented';
  }

  async updateCashierLastLogin(id: number): Promise <String> {
  try {
    let update_status = await this.prisma.cashier.update({where: {
      id:id,
      
    },
    data: {
      is_online:true
    }});
    return "Estatus actualizado"
  }
  catch (error) {
    return "Error al actualizar el estatus del cajero"
  }
  
  }

  async updateCashierLastLogout(id: number): Promise <Boolean> {

    try {
      let update_status = await this.prisma.cashier.update({where: {
        id:id, 
      },
      data: {
        is_online:false
      }});
    
      return true;
      }
      catch {
        return false;
      }
    }

    
    

  async logoutCashier(id: string): Promise<any> {
    return 'unimplemented';
  }
  /*
    personal_id: string;
    password: string;
    name: string;
    phone_number: string;
    email: string;
    residence_location: string;
    role: RoleOptions;
*/

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

    if (
      !idRegExp.test(data.personal_id) ||
      data.personal_id.length > 10 ||
      data.personal_id.length < 8
    ) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Cédula inválida',
            description:
              'La cédula debe contener solo números y no puede ser mayor a 10 caracteres, ni menor a 8',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    if (data.password.length > 255) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Contraseña inválida',
            description: 'la contraseña no puede ser mayor a 255 caracteres',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
    if (
      data.name.length < 3 ||
      !nameRegExp.test(data.name) ||
      data.name.length > 70
    ) {
      response = {
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
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
    if (
      data.phone_number.length != 10 ||
      !phoneRegExp.test(data.phone_number)
    ) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Número de teléfono inválido',
            description:
              'El número de teléfono debe contener solo números y tener 10 caracteres',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
    if (
      data.email.length < 5 ||
      data.email.length > 70 ||
      !emailRegExp.test(data.email)
    ) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Correo electrónico inválido',
            description:
              'El correo electrónico debe tener una estructura válida, y contener entre 5 y 70 caracteres',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    if (
      data.residence_location.length < 3 ||
      data.residence_location.length > 70
    ) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Ubicación de residencia inválida',
            description:
              'La ubicación de residencia no puede ser menor a 3 caracteres, ni mayor a 70',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
    if (data.role != RoleOptions.ADMIN && data.role != RoleOptions.CASHIER) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Rol inválido',
            description: 'El rol del usuario debe ser administrador o cajero',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }
    if (db_personal_id && !db_personal_id.is_deleted) {
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
      console.log('sdsdsdsdsadadsddadsdadasdsd', data.role);

      let user_data = await this.prisma.user.findUnique({
        where: {
          personal_id: data.personal_id,
        },
      });

      if (user_data) {
        const update_user = await this.prisma.user.update({
          where: {
            personal_id: data.personal_id,
          },
          data: {
            personal_id: data.personal_id,
            password: data.password,
            name: data.name,
            phone_number: data.phone_number,
            email: data.email,
            residence_location: data.residence_location,
          },
        });
      } else {
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

        user_data = await this.prisma.user.findUnique({
          where: { personal_id: data.personal_id },
        });
      }

      //se busca el usuario recien insertado, con el fin de poder obtener el id autoincremental de la base de datos

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

  async editUser(data: EditUserData, res: Response): Promise<Response> {
    let response: AuthResponse;

    let current_password = null;
    let current_name = null;
    let current_phone_number = null;
    let current_email = null;
    let current_residence_location = null;

    let new_password = data.new_password;
    let new_name = data.new_name;
    let new_phone_number = data.new_phone_number;
    let new_email = data.new_email;
    let new_residence_location = data.new_residence_location;

    try {
      let current_data = await this.prisma.user.findUnique({
        where: { personal_id: data.current_personal_id },
        select: {
          personal_id: true,
          password: true,
          name: true,
          phone_number: true,
          email: true,
          residence_location: true,
        },
      });
      if (current_data) {
        current_password = current_data.password;
        current_name = current_data.name;
        current_phone_number = current_data.phone_number;
        current_email = current_data.email;
        current_residence_location = current_data.residence_location;
      } else {
        response = {
          error: true,
          body: {
            message: {
              title: 'Usuario no encontrado',
              description: 'No se encontró el usuario en la base de datos',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(response);
      }
    } catch (error) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Error buscando usuario',
            description:
              'Ocurrió un error consultando la cédula en la base de datos',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    if (new_password !== current_password && Boolean(new_password)) {
      if (new_password.length > 255) {
        response = {
          error: true,
          body: {
            message: {
              title: 'Contraseña inválida',
              description: 'la contraseña no puede ser mayor a 255 caracteres',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(response);
      }
      // try {
      const update_password = await this.prisma.user.update({
        where: {
          personal_id: data.current_personal_id,
        },
        data: {
          password: new_password,
        },
      });
      // } catch (error) {
      //   response = {
      //     error: true,
      //     body: {
      //       message: {
      //         title: 'Error al actualizar la contraseña',
      //         description:
      //           'Ocurrió un error al actualizar la contraseña en la base de datos',
      //         notificationStatus: NotificationStatus.ERROR,
      //       },
      //     },
      //   };
      //   return res.status(HttpStatus.UNAUTHORIZED).json(response);
      // }
    }

    if (new_email !== current_email) {
      let check_new_email = null;
      try {
        check_new_email = await this.prisma.user.findUnique({
          where: { email: new_email },
        });
      } catch (error) {
        response = {
          error: true,
          body: {
            message: {
              title: 'Error al verificar el correo electrónico',
              description:
                'Ocurrió un error al verificar el correo electrónico en la base de datos',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(response);
      }

      if (!check_new_email) {
        if (
          new_email.length < 5 ||
          new_email.length > 70 ||
          !emailRegExp.test(new_email)
        ) {
          response = {
            error: true,
            body: {
              message: {
                title: 'Correo electrónico inválido',
                description:
                  'El correo electrónico debe tener una estructura válida, y contener entre 5 y 70 caracteres',
                notificationStatus: NotificationStatus.ERROR,
              },
            },
          };
          return res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
        try {
          const update_email = await this.prisma.user.update({
            where: {
              personal_id: data.current_personal_id,
            },
            data: {
              email: new_email,
            },
          });
        } catch (error) {
          response = {
            error: true,
            body: {
              message: {
                title: 'Error al actualizar el correo electrónico',
                description:
                  'Ocurrió un error al actualizar el correo electrónico en la base de datos',
                notificationStatus: NotificationStatus.ERROR,
              },
            },
          };
          return res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
      } else {
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
      }
    }

    if (new_phone_number !== current_phone_number) {
      let check_phone_number = null;
      try {
        check_phone_number = await this.prisma.user.findUnique({
          where: { phone_number: new_phone_number },
        });
      } catch (error) {
        response = {
          error: true,
          body: {
            message: {
              title: 'Error al verificar el número de teléfono',
              description:
                'Ocurrió un error al verificar el número de teléfono en la base de datos',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(response);
      }

      if (!check_phone_number) {
        if (
          new_phone_number.length != 10 ||
          !phoneRegExp.test(new_phone_number)
        ) {
          response = {
            error: true,
            body: {
              message: {
                title: 'Número de teléfono inválido',
                description:
                  'El número de teléfono debe contener solo números y tener 10 caracteres',
                notificationStatus: NotificationStatus.ERROR,
              },
            },
          };
          return res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
        try {
          const update_phone_number = await this.prisma.user.update({
            where: {
              personal_id: data.current_personal_id,
            },
            data: {
              phone_number: new_phone_number,
            },
          });
        } catch (error) {
          response = {
            error: true,
            body: {
              message: {
                title: 'Error al actualizar el número de teléfono',
                description:
                  'Ocurrió un error al actualizar el número de teléfono en la base de datos',
                notificationStatus: NotificationStatus.ERROR,
              },
            },
          };
          return res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
      } else {
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
      }
    }

    if (
      new_residence_location.length < 3 ||
      new_residence_location.length > 70
    ) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Ubicación de residencia inválida',
            description:
              'La ubicación de residencia no puede ser menor a 3 caracteres, ni mayor a 70',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    if (
      new_name.length < 3 ||
      !nameRegExp.test(new_name) ||
      new_name.length > 70
    ) {
      response = {
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
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    try {
      const update_user = await this.prisma.user.update({
        where: {
          personal_id: data.current_personal_id,
        },
        data: {
          name: new_name,
          residence_location: new_residence_location,
        },
      });
    } catch (error) {
      response = {
        error: true,
        body: {
          message: {
            title: 'Error al actualizar el usuario',
            description:
              'Ocurrió un error al actualizar el usuario en la base de datos',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(response);
    }

    response = {
      error: false,
      body: {
        message: {
          title: 'Usuario actualizado correctamente',
          description:
            'Se actualizó el usuario correctamente en la base de datos',
          notificationStatus: NotificationStatus.SUCCESS,
        },
      },
    };
    return res.status(HttpStatus.OK).json(response);
  }

  async sendResetCode(email: string, res: Response): Promise<Response> {
    // Send a random code to the email provided by the client, but first check if the email exists in the database, if it doesn't, then return an error message
   try {
    const isFoundUser = await this.prisma.user.findUnique({where: {email: email}});
    if(!Boolean(isFoundUser)) {
      throw new Error('No se encontró el usuario')
    }
    await this.mailService.sendResetPasswordCode(email)
    return res.status(HttpStatus.OK).json({
      error: false,
      body: {
        message: {
          title: 'Código de verificación enviado',
          description: `Se envió el código de verificación al correo electrónico: ${email}`,
          notificationStatus: NotificationStatus.SUCCESS,
        },
      },
    });
   } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: true,
        body: {
          message: {
            title: 'Error al enviar el código de verificación',
            description: `${error}`,
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      });
   }
  }
  async verifyResetCode(data: {email: string, code: string}) {
    try {
      const storedCodeByEmail = (await this.mailService.getSentCode(data.email));
      return storedCodeByEmail === data.code;
    } catch (error) {
      throw new Error(error)
    }
  }

  async restorePassword(data: RestorePassword, res: Response) {
    let password = data.password;
    let email = data.email;
    let user;

    try {
      user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      let Response = {
        error: true,
        body: {
          message: {
            title: 'Error al buscar usuario',
            description:
              'Ocurrió un error al buscar el usuario en la base de datos',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(Response);
    }

    if (!user) {
      let Response = {
        error: true,
        body: {
          message: {
            title: 'Usuario no encontrado',
            description: 'No se encontró el usuario en la base de datos',
            notificationStatus: NotificationStatus.ERROR,
          },
        },
      };
      return res.status(HttpStatus.UNAUTHORIZED).json(Response);
    } else {
      if (!password) {
        let Response = {
          error: true,
          body: {
            message: {
              title: 'Contraseña inválida',
              description: 'La contraseña no puede estar vacía',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(Response);
      }

      if (password.length > 255) {
        let Response = {
          error: true,
          body: {
            message: {
              title: 'Contraseña inválida',
              description: 'El hash no debe contener más de 255 caracteres',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(Response);
      }

      try {
        const update_password = await this.prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: password,
          },
        });
      } catch (error) {
        let Response = {
          error: true,
          body: {
            message: {
              title: 'Error al actualizar la contraseña',
              description:
                'Ocurrió un error al actualizar la contraseña en la base de datos',
              notificationStatus: NotificationStatus.ERROR,
            },
          },
        };
        return res.status(HttpStatus.UNAUTHORIZED).json(Response);
      }
      let Response = {
        error: false,
        body: {
          message: {
            title: 'Contraseña actualizada correctamente',
            description:
              'Se actualizó la contraseña correctamente en la base de datos',
            notificationStatus: NotificationStatus.SUCCESS,
          },
        },
      };
      return res.status(HttpStatus.OK).json(Response);
    }
  }
}
