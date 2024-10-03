import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Materia } from 'src/materia/entities/materia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Horario, Materia, Profesor, Grado, Seccion, Aula]),
  ],
  controllers: [HorarioController],
  providers: [HorarioService],
})
export class HorarioModule {}
