import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  encryptSessionCookie,
  decryptSessionCookie,
  updateSessionCookie,
} from '@/auth/lib';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const session = req.cookies['SESSION_TOKEN'];
    const [e, parsedPayload] = await decryptSessionCookie(session);

    if (e) {
      return res.status(401).json({
        error: true,
        body: {
          message: {
            title: 'Unauthorized',
            description: e.message,
            notificationStatus: 'error',
          },
        },
      });
    }

    if (
      parsedPayload.role === 'admin' &&
      parsedPayload.expiresAt < new Date() &&
      req.path.includes('admin')
    ) {
      const newSession = await updateSessionCookie(session);
      res.cookie('SESSION_TOKEN', newSession, {
        httpOnly: true,
      });
    }
  }
}
