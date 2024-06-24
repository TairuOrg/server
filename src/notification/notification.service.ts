import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationData } from '@/types/api/types';
import { Response } from 'express';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async insert(data: NotificationData, res: Response) {
    try {
      const insert_notification = await this.prisma.notifications.create({
        data: {
          body_message: data.body_message,
          priority_status: data.priority_status,
          date: data.date,
        },
      });

      const response = {
        error: false,
        body: {
          message: 'Notificación creada con éxito.',
        },
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const response = {
        error: true,
        body: {
          message: 'Error al crear la notificación.',
        },
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
