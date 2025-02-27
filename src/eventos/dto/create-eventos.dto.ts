// src/events/dto/create-eventos.dto.ts

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  Validate,
  Matches,
} from 'class-validator';
import { IsNotPastDate } from '../Validators/is-not-past-date.validator';
import { IsNotOverlapping } from '../Validators/is-not-overlapping.validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre_Evento: string;

  @IsString()
  @IsOptional()
  descripcion_Evento?: string;

  @Type(() => Date)
  @IsDate({ message: 'La fecha del evento debe ser una fecha válida' })

  @Validate(IsNotPastDate, {
    message: 'La fecha del evento no puede estar en el pasado.',
  })
  @Validate(IsNotOverlapping, {
    message: 'La ubicación está ocupada en el horario especificado.',
  })
  fecha_Evento: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de inicio debe estar en formato HH:MM',
  })
  hora_inicio_Evento: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora de fin debe estar en formato HH:MM',
  })

  hora_fin_Evento: string;

  @IsInt()
  id_dirigido_a: number;

  @IsInt()
  id_estado_evento: number;

  @IsInt()
  id_tipo_evento: number;

  @IsInt()
  id_ubicacion: number;
}
