import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from '../middleware/logger.middleware';  // Middleware para logging
import { MailerCustomModule } from '../mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule para manejar .env

@Module({
  imports: [
    UsersModule, // Importamos el módulo de usuarios
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno de .env de forma global
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule para tener acceso a las variables de entorno
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'defaultSecretKey', // JWT_SECRET desde .env
        signOptions: { expiresIn: '1h' },  // Tiempo de expiración del token
      }),
    }),
    MailerCustomModule, // Módulo para manejar correos
  ],
  providers: [AuthService, JwtStrategy], // Proveedor del servicio de autenticación y JWT Strategy
  controllers: [AuthController], // Controlador que expone la ruta /auth/login
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)  // Aplica el middleware de logging
      .forRoutes(AuthController);  // Aplica a todas las rutas del controlador AuthController
  }
}
