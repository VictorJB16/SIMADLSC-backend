import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Materia } from 'src/materia/entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Roles,Estudiante,Profesor,Grado,Seccion,Materia])],
  controllers: [UsersController],
  providers: [UsersService,RolesService],
  exports: [UsersService],
})
export class UsersModule {}
