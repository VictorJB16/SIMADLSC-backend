import { IsOptional, IsString, IsNumber, IsIn, Matches } from 'class-validator';

export class UpdateHorarioEstudianteDto {
  @IsOptional()
  @IsNumber()
  gradoId?: number;

  @IsOptional()
  @IsNumber()
  seccionId?: number;

  @IsOptional()
  @IsNumber()
  materiaId?: number;

  @IsOptional()
  @IsNumber()
  profesorId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'])
  dia_semana_Horario?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora de inicio inválida' })
  hora_inicio_Horario?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora de fin inválida' })
  hora_fin_Horario?: string;

  @IsOptional()
  @IsNumber()
  aulaId?: number;
}
