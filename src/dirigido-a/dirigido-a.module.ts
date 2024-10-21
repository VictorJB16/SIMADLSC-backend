// src/dirigidoA/dirigidoA.module.ts

import { Module } from '@nestjs/common';
import { DirigidoAService } from './dirigido-a.service';
import { DirigidoAController } from './dirigido-a.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirigidoA } from './entities/dirigido-a.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirigidoA])],
  controllers: [DirigidoAController],
  providers: [DirigidoAService],
  exports: [DirigidoAService],
})
export class DirigidoAModule {}
