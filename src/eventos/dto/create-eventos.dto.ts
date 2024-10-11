
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsInt} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre_Evento: string;

  @IsString()
  @IsOptional()
  descripcion_Evento?: string;

  @Type(() => Date)
  @IsDate({ message: 'fecha_Evento must be a Date instance' })
  fecha_Evento: Date;

  @IsString()
  @IsNotEmpty()
  hora_inicio_Evento: string;

  @IsString()
  @IsNotEmpty()
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
