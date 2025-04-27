import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiante,
      Horario,
      Seccion,
      EncargadoLegal,
      Grado,
    ]),
    UsersModule,  // Importa el módulo de usuarios para inyectar UsersService
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}