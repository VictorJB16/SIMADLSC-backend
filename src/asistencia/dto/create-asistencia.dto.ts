import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNotEmpty()
  @IsNumber()
  id_estudiante: number;

  @IsNotEmpty()
  @IsNumber()
  id_seccion: number;

  @IsNotEmpty()
  @IsNumber()
  id_materia: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  detalles_justificacion?: string;
}
