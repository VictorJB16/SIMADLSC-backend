import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class FilterAsistenciaDto {
  @IsOptional()
  @IsString()
  nombre?: string;  // Filtro por nombre de estudiante (opcional)

  @IsOptional()
  @IsString()
  estado?: string;  // Filtro por estado de la asistencia (ej. "Presente", "Ausente")

  @IsOptional()
  @IsBoolean()
  justificado?: boolean;  // Filtro por si la asistencia está justificada o no

  @IsOptional()
  @IsString()
  grado?: string;  // Filtro por grado

  @IsOptional()
  @IsString()
  seccion?: string;  // Filtro por sección

  @IsOptional()
  @IsNumber()
  profesorId?: number;  // Filtro por profesor logueado

  @IsOptional()
  @IsNumber()
  materiaId?: number;  // Filtro por materia enseñada por el profesor

  @IsOptional()
  @IsString()
  fecha?: string;  // Filtro por fecha de la asistencia (en formato 'YYYY-MM-DD')

  @IsOptional()
  @IsString()
  hora?: string;  // Filtro por hora de la asistencia (en formato 'HH:MM')

  @IsOptional()
  @IsNumber()
  page?: number;  // Paginación - página actual

  @IsOptional()
  @IsNumber()
  limit?: number;  // Paginación - límite de resultados por página
}
