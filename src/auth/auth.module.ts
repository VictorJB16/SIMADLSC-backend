import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { XssProtectionMiddleware } from '../middleware/xss.middleware';
import { MailerCustomModule } from '../mailer/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'defaultSecretKey',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MailerCustomModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, XssProtectionMiddleware) // Aplica ambos middlewares en una sola llamada
      .forRoutes(AuthController); // Aplica a todas las rutas del controlador AuthController
  }
}
