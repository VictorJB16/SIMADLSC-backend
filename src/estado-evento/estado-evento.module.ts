// src/estadoEvento/estado-evento.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEventoService } from './estado-evento.service';
import { EstadoEventoController } from './estado-evento.controller';
import { EstadoEvento } from './entities/estado-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEvento])],
  controllers: [EstadoEventoController],
  providers: [EstadoEventoService],
  exports: [EstadoEventoService],
})
export class EstadoEventoModule {}
