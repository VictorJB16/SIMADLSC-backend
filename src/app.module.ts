// src/app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuditMiddleware } from './middleware/audit.middleware';
import { XssProtectionMiddleware } from './middleware/xss.middleware';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import { SeccionesModule } from './secciones/secciones.module';
import { GradosModule } from './grados/grados.module';
import { MailerCustomModule } from './mailer/mailer.module';
import { HorarioModule } from './horario/horario.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { MateriaModule } from './materia/materia.module';
import { AulasModule } from './aulas/aulas.module';
import { EventosModule } from './eventos/eventos.module';
import { DirigidoAModule } from './dirigido-a/dirigido-a.module';
import { TipoEventoModule } from './tipo-evento/tipo-evento.module';
import { EstadoEventoModule } from './estado-evento/estado-evento.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { JustificacionAusenciaModule } from './justificacion_ausencia/justificacion_ausencia.module';
import { EncargadoLegalModule } from './encargado-legal/encargado-legal.module';
import { MatriculaModule } from './matricula/matricula.module';
import { PeriodoModule } from './periodo/periodo.module';
import { AppController } from './app/app.controller';

// Define una función de configuración para cargar valores sensibles
const config = () => ({
  database: {
    url:
      process.env.DATABASE_URL ||
      'mariadb://railway:Yiieg23i2eNM~vR2CGnTT658J_usWTo.@mariadb.railway.internal:3306/simadlsc',
  },
  mail: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER || 'liceosantacruz0219@gmail.com',
      pass: process.env.SMTP_PASS || 'urrq lbxp vyee mtow',
    },
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'https://simadlsc.vercel.app',
  },
});

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      // apunta a la carpeta uploads EN LA RAÍZ de tu proyecto, no a dist/uploads
      rootPath: join(process.cwd(), 'uploads'),
      serveStaticOptions: {
        index: false,      // no sirve index.html
        fallthrough: false // devuelve 404 si no existe el archivo
      },
    }),

    // 2) Módulos de configuración y ORM
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        url: configService.get<string>('database.url'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        ssl: { rejectUnauthorized: false },
      }),
    }),

    // 3) Resto de tus módulos
    AsistenciasModule,
    JustificacionAusenciaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    SeccionesModule,
    GradosModule,
    EstudianteModule,
    MateriaModule,
    MailerCustomModule,
    HorarioModule,
    ProfesorModule,
    EventosModule,
    AulasModule,
    EncargadoLegalModule,
    MatriculaModule,
    DirigidoAModule,
    TipoEventoModule,
    EstadoEventoModule,
    UbicacionModule,
    PeriodoModule,
  ],
  controllers: [ProfileController, AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuditMiddleware, XssProtectionMiddleware)
      .forRoutes('*');
  }
}
