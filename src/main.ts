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

  // Lista de orígenes permitidos
  const allowedOrigins = ['http://localhost:5173', 'https://simadlsc.vercel.app'];

  // Configurar CORS correctamente
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Elimina este middleware innecesario (causaba el error)
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin','http://localhost:5173', 'https://simadlsc.vercel.app');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   if (req.method === 'OPTIONS') {
  //     return res.sendStatus(200);
  //   }
  //   next();
  // });

  // Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
}

bootstrap();
