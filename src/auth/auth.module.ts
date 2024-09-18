import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from '../middleware/logger.middleware';  // Importa el middleware de logging

@Module({
  imports: [
    UsersModule, // Importamos el módulo de usuarios
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // Este controlador expone la ruta /auth/login
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)  // Aplica el middleware de logging
      .forRoutes(AuthController)  // Aplica a todas las rutas del controlador AuthController

  }
}
