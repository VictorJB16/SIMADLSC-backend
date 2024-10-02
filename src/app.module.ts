import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
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
import { SeccionesModule } from './secciones/secciones.module';
import { GradosModule } from './grados/grados.module';
import { MailerCustomModule } from './mailer/mailer.module';
import { HorarioModule } from './horario/horario.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MateriaModule } from './materia/materia.module';
import { PeriodoModule } from './periodo/periodo.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la aplicación
      envFilePath: '.env', // Opcional si el archivo .env está en la raíz
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    SeccionesModule,
    GradosModule,
    MailerCustomModule,
    HorarioModule,
    ProfesorModule,
    EstudianteModule,
    MateriaModule,
    PeriodoModule,
  ],
  controllers: [ProfileController],
  providers: [MailerCustomModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      
      .apply(LoggerMiddleware)
      .forRoutes('*') 

      .apply(CorsMiddleware)
      .forRoutes('*')  

      .apply(AuditMiddleware)
      .forRoutes('*')  

      .apply(XssProtectionMiddleware)
      .forRoutes('*')  

      .apply(rateLimitMiddleware)
      .forRoutes('*');  
  }
}
