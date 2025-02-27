// src/asistencias/dto/create-asistencia.dto.ts

import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    ValidateIf,
    ValidateNested,
  } from 'class-validator';
  import { AsistenciaStatus } from '../entities/asistencia-status.enum';
  import { Type } from 'class-transformer';
  import { CreateJustificacionAusenciaDto } from 'src/justificacion_ausencia/dto/create-justificacion_ausencia.dto';
  
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

    @IsArray()
    @ArrayMinSize(1)
    lecciones: number[];
  
    // Justificación solo es requerida si el estado es 'JUSTIFICADO'
    @ValidateIf((o) => o.estado === AsistenciaStatus.JUSTIFICADO)
    @ValidateNested()
    @Type(() => CreateJustificacionAusenciaDto)
    justificacionAusencia?: CreateJustificacionAusenciaDto;
  }
  