// src/events/events.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Eventos } from './entities/eventos.entity';
import { EstadoEvento } from 'src/estado-evento/entities/estado-evento.entity';
import { DirigidoA } from 'src/dirigido-a/entities/dirigido-a.entity';
import { TipoEvento } from 'src/tipo-evento/entities/tipo-evento.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
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
