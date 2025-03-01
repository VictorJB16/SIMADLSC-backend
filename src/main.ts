import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './horario/filter/AllExceptionsFilter';

// Cargar variables de entorno
dotenv.config();

// Importar crypto para Node.js (Solo si es necesario)
import * as crypto from 'crypto';

// Función segura para generar un UUID que funciona en local y producción
const generarUUID = () => {
  if (typeof globalThis.crypto !== 'undefined' && 'randomUUID' in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  } else {
    return crypto.randomUUID(); // Fallback para Node.js
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar filtros globales para manejar excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configuración correcta de CORS
  const allowedOrigins = ['http://localhost:5173', 'https://simadlsc.vercel.app'];
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Middleware para asegurarse de que los headers de CORS se configuren correctamente
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  });

  // Habilitar validaciones globales para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Ejemplo de uso de la función para generar UUID en cualquier parte del código
  const nombre = generarUUID();
  console.log(`UUID generado: ${nombre}`);

  // Iniciar el servidor en el puerto 3000
  await app.listen(3000);
  console.log(`🚀 Servidor corriendo en: http://localhost:3000`);
}

bootstrap();
