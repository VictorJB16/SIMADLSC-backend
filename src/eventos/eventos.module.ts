// src/events/events.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { Eventos } from './entities/eventos.entity';
import { EstadoEvento } from 'src/estado-evento/entities/estado-evento.entity';
import { TipoEvento } from 'src/tipo-evento/entities/tipo-evento.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { DirigidoA } from 'src/dirigido-a/entities/dirigido-a.entity';
import { ValidatorsModule } from './Validators/validators.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Eventos, EstadoEvento, TipoEvento, Ubicacion, DirigidoA]),
    ValidatorsModule, // Importa el módulo de validadores
  ],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {}
