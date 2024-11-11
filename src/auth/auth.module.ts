// src/auth/auth.module.ts
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { XssProtectionMiddleware } from '../middleware/xss.middleware';
import { MailerCustomModule } from '../mailer/mailer.module';

// Configuración estática para JWT
const JWT_SECRET = "mi-clave-secreta-jwt";
const JWT_EXPIRATION = "3600";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),
    MailerCustomModule, // Importa el módulo de correo personalizado
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, XssProtectionMiddleware)
      .forRoutes(AuthController);
  }
}
