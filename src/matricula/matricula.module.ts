import { Module } from '@nestjs/common';
// import { MatriculaController } from './matricula.controller';
// import { MatriculaService } from './matricula.service';
import { Grado } from 'src/grados/entities/grados-entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { Matricula } from './entities/matricula.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
//import { Usuario } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante,EncargadoLegal,Grado,Matricula,Seccion])], 

  // controllers: [MatriculaController],
  // providers: [MatriculaService]
})
export class MatriculaModule {}
