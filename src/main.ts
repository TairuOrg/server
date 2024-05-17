import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error) => {
        const errorMessageDispatch = error.map((err) => ({
          error: true,
          body: {
            message: {
              title: 'Bad request',
              message: Object.values(err.constraints).join(','),
              notificationStatus: 'error',
            },
          },
        }));
        return new BadRequestException(errorMessageDispatch);
      },
    }),
  );
  
  await app.listen(4000);
}
bootstrap();
