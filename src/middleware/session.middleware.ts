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
    console.log(parsedPayload, 'request cookie');
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

    if (parsedPayload.role === 'admin' && req.path.includes('admin')) {
      const [e, newSession] = await updateSessionCookie(session);
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
      res.cookie('SESSION_TOKEN', newSession, {
        httpOnly: true,
      });
      next();
    }
  }
}
