import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombre_Estudiante: string;

  @IsNotEmpty()
  @IsString()
  apellido1_Estudiante: string;

  @IsNotEmpty()
  @IsString()
  apellido2_Estudiante: string;

  @IsOptional()
  @IsString()
  estado_Estudiante?: string;

  @IsNotEmpty()
  @IsNumber()
  seccionId: number;

  @IsNotEmpty()
  @IsNumber()
  gradoId: number;
}
