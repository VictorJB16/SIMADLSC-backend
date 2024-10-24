import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { Matricula } from './entities/matricula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { Grado } from 'src/grados/entities/grados-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula,Estudiante,EncargadoLegal,Periodo,Grado])], 

  controllers: [MatriculaController],
  providers: [MatriculaService]
})
export class MatriculaModule {}
