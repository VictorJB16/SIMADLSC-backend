// src/asistencias/dto/create-asistencia.dto.ts

import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    ValidateIf,
    ValidateNested,
  } from 'class-validator';
  import { AsistenciaStatus } from '../entities/asistencia-status.enum';
  import { Type } from 'class-transformer';
  import { IsAsistenciaUnique } from '../validators/asistencia-unique.validator';
  import { CreateJustificacionAusenciaDto } from 'src/justificacion_ausencia/dto/create-justificacion_ausencia.dto';
  
  @IsAsistenciaUnique({
    message:
      'Ya existe una asistencia registrada para este día con el mismo estudiante, materia, profesor, grado, sección y período.',
  })
  export class CreateAsistenciaDto {
    @IsDateString()
    @IsNotEmpty()
    fecha: string;
  
    @IsEnum(AsistenciaStatus)
    @IsNotEmpty()
    estado: AsistenciaStatus;
  
    @IsNotEmpty()
    @IsNumber()
    id_Estudiante: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_Materia: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_grado: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_Seccion: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_Profesor: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_Periodo: number;
  
    // Justificación solo es requerida si el estado es 'JUSTIFICADO'
    @ValidateIf((o) => o.estado === AsistenciaStatus.JUSTIFICADO)
    @ValidateNested()
    @Type(() => CreateJustificacionAusenciaDto)
    justificacionAusencia?: CreateJustificacionAusenciaDto;
  }
  