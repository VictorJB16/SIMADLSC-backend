import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { whitelist } from 'validator';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './horario/filter/AllExceptionsFilter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://simadlsc-rlc.vercel.app'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH,REJECT,APPROVE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, 
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));
  await app.listen(3000);
}
bootstrap();
