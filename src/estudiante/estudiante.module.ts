import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante,Horario,Grado,Seccion
     ]),
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
