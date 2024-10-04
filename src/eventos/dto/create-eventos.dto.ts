// src/events/dto/create-event.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Matches,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { EstadoEvento } from '../entities/estado-eventos.entity';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del evento es requerido.' })
  nombre_Evento: string;

  @IsString()
  @IsOptional()
  descripcion_Evento?: string;

  @IsDateString({}, { message: 'La fecha del evento debe ser una fecha válida.' })
  fecha_Evento: string;

  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe tener el formato HH:MM.',
  })
  hora_inicio_Evento: string;

  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de fin debe tener el formato HH:MM.',
  })
  hora_fin_Evento: string;

  @IsNumber({}, { message: 'id_dirigido_a debe ser un número.' })
  id_dirigido_a: number;

  @IsNumber({}, { message: 'id_estado_evento debe ser un número.' })
  id_estado_evento: number;

  @IsNumber({}, { message: 'El userId debe ser un número.' })
  userId: number;
}
