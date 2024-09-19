import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';  // Middleware de logging
import { CorsMiddleware } from './middleware/cors.middleware';  // Middleware de CORS
import { AuditMiddleware } from './middleware/audit.middleware';  // Middleware de auditoría
import { XssProtectionMiddleware } from './middleware/xss.middleware';  // Middleware de protección contra XSS
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';  // Middleware de rate limiting
import { Seccion } from './secciones/entities/seccion.entity';
import { SeccionesModule } from './secciones/secciones.module';
import { GradosModule } from './grados/grados.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'simadlsc',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AsistenciaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    SeccionesModule,
    GradosModule
  ],
  controllers: [ProfileController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // LoggerMiddleware: Aplicar globalmente para registrar todas las solicitudes
      .apply(LoggerMiddleware)
      .forRoutes('*')  // Aplica a todas las rutas

      // CorsMiddleware: Permitir solicitudes de todos los orígenes (puedes ajustarlo según sea necesario)
      .apply(CorsMiddleware)
      .forRoutes('*')  // Aplica a todas las rutas

      // AuditMiddleware: Registrar acciones importantes para auditoría
      .apply(AuditMiddleware)
      .forRoutes('*')  // Aplica a todas las rutas

      // XssProtectionMiddleware: Proteger contra ataques XSS sanitizando las entradas de las solicitudes
      .apply(XssProtectionMiddleware)
      .forRoutes('*')  // Aplica a todas las rutas

      // Rate Limiting Middleware: Limitar la cantidad de solicitudes a 100 por IP cada 15 minutos
      .apply(rateLimitMiddleware)
      .forRoutes('*');  // Aplica a todas las rutas
  }
}
