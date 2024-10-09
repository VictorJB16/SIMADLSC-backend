import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Roles,Estudiante,Profesor])],
  controllers: [UsersController],
  providers: [UsersService,RolesService],
  exports: [UsersService],
})
export class UsersModule {}
