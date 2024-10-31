// src/evento/dto/filter-eventos.dto.ts

import { IsOptional, IsDateString, IsEnum, IsString } from 'class-validator';

export class FilterEventosDto {
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @IsOptional()
  @IsDateString()
  fechaHasta?: string;

  @IsOptional()
  @IsString()
  horaDesde?: string;

  @IsOptional()
  @IsString()
  horaHasta?: string;

  @IsOptional()
  @IsEnum(['aprobado', 'rechazado', 'pendiente'], {
    message: 'El estado debe ser aprobado, rechazado o pendiente',
  })
  estado?: 'aprobado' | 'rechazado' | 'pendiente';
}
