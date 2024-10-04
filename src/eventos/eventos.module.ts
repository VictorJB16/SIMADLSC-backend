// src/events/events.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Eventos } from './entities/eventos.entity';
import { EstadoEvento } from './entities/estado-eventos.entity';
import { DirigidoA } from './entities/dirigido-a.entity';
import { TipoEvento } from './entities/tipo-eventos.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Eventos,
      EstadoEvento,
      DirigidoA,
      TipoEvento,
      Ubicacion,
    ]),
  ],
  controllers: [EventosController],
  providers: [
    EventosService,
  
  ],
})
export class EventosModule {}
