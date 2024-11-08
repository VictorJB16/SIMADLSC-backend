import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';  
import { CorsMiddleware } from './middleware/cors.middleware';  
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
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.MARIADB_HOST,
    port: parseInt(process.env.MARIADB_PORT) || 3306,
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    entities: [__dirname + '//*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true, // Cambia a false en producción para evitar sincronización automática
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
      .forRoutes('*');
  }
}