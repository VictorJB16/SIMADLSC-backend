import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateAsistenciaDto {
  @IsOptional()  // El campo puede estar presente, pero no es obligatorio
  @IsNumber()
  id_estudiante?: number;  // Lo dejamos opcional, pero no permitimos cambiarlo en el servicio

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
