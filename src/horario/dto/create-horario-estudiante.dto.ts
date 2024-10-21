import { IsNotEmpty, IsString, IsNumber, IsIn, Matches } from 'class-validator';

export class CreateHorarioEstudianteDto {
  @IsNotEmpty()
  @IsNumber()
  gradoId: number;

  @IsNotEmpty()
  @IsNumber()
  seccionId: number;

  @IsNotEmpty()
  @IsNumber()
  materiaId: number;

  @IsNotEmpty()
  @IsNumber()
  profesorId: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
  dia_semana_Horario: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora de inicio inválida' })
  hora_inicio_Horario: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora de fin inválida' })
  hora_fin_Horario: string;

  @IsNotEmpty()
  @IsNumber()
  aulaId: number;
}
 