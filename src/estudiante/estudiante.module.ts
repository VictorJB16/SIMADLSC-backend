import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante,Horario ]),
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
