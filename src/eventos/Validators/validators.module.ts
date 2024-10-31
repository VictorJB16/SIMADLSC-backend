// src/validators/validators.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eventos } from '../entities/eventos.entity';
import { IsNotPastDateConstraint } from './is-not-past-date.validator';
import { IsNotOverlappingConstraint } from './is-not-overlapping.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Eventos])],
  providers: [IsNotPastDateConstraint, IsNotOverlappingConstraint],
  exports: [IsNotPastDateConstraint, IsNotOverlappingConstraint],
})
export class ValidatorsModule {}
