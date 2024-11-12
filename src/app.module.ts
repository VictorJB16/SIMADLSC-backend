import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
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

// Definir configuraciones globales de JWT y SMTP
const JWT_CONFIG = {
  secret: "mi-clave-secreta-jwt",
  expiration: "3600",
  resetPasswordSecret: "mi-secreto-jwt-reset-password",
  resetPasswordExpiration: "3600",
};

const SMTP_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  user: "Martinguaduz@gmail.com",
  pass: "jrvc lzxu fnwh rttu",
  secure: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      url: 'mariadb://railway:H6RH2AMSROf0xNW3~9hIJR.UqxIx7k5w@autorack.proxy.rlwy.net:14487/railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      ssl: { rejectUnauthorized: false },
    }),
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
      // Configura tus middlewares según sea necesario
  }
}
