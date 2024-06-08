import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    methods: 'GET, POST, PATCH, DELETE, OPTIONS',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (error) => {
        const errorMessageDispatch = error.map((err) => ({
          error: true,
          body: {
            message: {
              title: 'Solicitud inválida',
              message: Object.values(err.constraints).join(','),
              notificationStatus: 'error',
            },
          },
        }));
        return new BadRequestException(errorMessageDispatch);
      },
      whitelist: true,
    }),
  );

  await app.listen(4000);
}
bootstrap();
