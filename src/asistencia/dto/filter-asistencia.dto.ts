import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class FilterAsistenciaDto {
  @IsOptional()
  @IsString()
  nombre?: string; 

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsBoolean()
  justificado?: boolean; 

  @IsOptional()
  @IsString()
  grado?: string; 

  @IsOptional()
  @IsString()
  seccion?: string; 

  @IsOptional()
  @IsNumber()
  page?: number; 

  @IsOptional()
  @IsNumber()
  limit?: number; 
}
