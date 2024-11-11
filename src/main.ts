import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './horario/filter/AllExceptionsFilter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar filtros globales y excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://simadlsc-lscc.vercel.app'], // sin la barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Opciones permitidas
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true,
  });

  // Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
}

bootstrap();
