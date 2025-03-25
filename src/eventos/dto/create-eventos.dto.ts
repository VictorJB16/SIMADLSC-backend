// src/events/dto/create-eventos.dto.ts
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  Matches,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre_Evento: string;

  @IsString()
  @IsOptional()
  descripcion_Evento?: string;

  @Transform(({ value }) => {
    // Si recibimos "2025-04-19", separamos sus componentes
    if (typeof value === 'string') {
      const [year, month, day] = value.split('-').map(Number);
      // Creamos un objeto Date usando el constructor local (nota: mes es 0-based)
      return new Date(year, month - 1, day);
    }
    return value;
  })
  @IsDate({ message: 'La fecha del evento debe ser una fecha válida' })
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
