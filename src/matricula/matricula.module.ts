import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { Matricula } from './entities/matricula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { UsersModule } from 'src/users/users.module';
import { MailerCustomModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Matricula, Estudiante, EncargadoLegal, Grado, Seccion]),
    UsersModule,
    MailerCustomModule
  ],
  controllers: [MatriculaController],
  providers: [MatriculaService]
})
export class MatriculaModule {}