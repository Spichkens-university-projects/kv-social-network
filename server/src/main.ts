import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.1.3:3000'],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5ydSIsImlhdCI6MTY4MjYwMzQwMCwiZXhwIjoxNjgyNjEwNjAwfQ.-FX5FjeAVmBEJVAkO2cfKf995qTnXI-schHaPm7ucgk',
        },
      },
    },
  };

  const config = new DocumentBuilder()
    .setTitle('KV API')
    .setDescription('Описание существующих эндпоинтов')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
  await app.listen(3001);
}

bootstrap();
