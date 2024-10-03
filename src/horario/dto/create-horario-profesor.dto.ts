import { IsNotEmpty, IsString, IsNumber, IsIn, Matches } from 'class-validator';

export class CreateHorarioProfesorDto {
  @IsNotEmpty()
  @IsNumber()
  profesorId: number;

  @IsNotEmpty()
  @IsNumber()
  gradoId: number;

  @IsNotEmpty()
  @IsNumber()
  materiaId: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
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
