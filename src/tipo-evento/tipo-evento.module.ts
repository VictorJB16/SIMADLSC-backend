// src/tipoEvento/tipo-evento.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEventoService } from './tipo-evento.service';
import { TipoEventoController } from './tipo-evento.controller';
import { TipoEvento } from './entities/tipo-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEvento])],
  controllers: [TipoEventoController],
  providers: [TipoEventoService],
  exports: [TipoEventoService],
})
export class TipoEventoModule {}
