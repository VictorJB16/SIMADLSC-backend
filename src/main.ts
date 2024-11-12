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
<<<<<<< HEAD
    origin: ['http://localhost:5173', 'https://simadlsc.vercel.app','https://simadlsc-oemhkxw3-cristianag13s-projects.vercel.app'], // dominios permitidos
=======
    origin: ['http://localhost:5173', 'https://simadlsc-nine.vercel.app/'], // dominios permitidos
>>>>>>> 49c01cbc398a77ee4431afae11fb2e0f514c3542
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true,
  });

<<<<<<< HEAD
=======
  // Middleware adicional para los encabezados CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://simadlsc-nine.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // Responde a las solicitudes preflight
    }
    next();
  });

>>>>>>> 49c01cbc398a77ee4431afae11fb2e0f514c3542
  // Configurar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
}

bootstrap();
