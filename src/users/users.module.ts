import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Usuario } from './entities/user.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Roles])],
  controllers: [UsersController],
  providers: [UsersService,RolesService],
  exports: [UsersService],
})
export class UsersModule {}
