import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class updateSeccionesDto {
  @IsOptional()
  @IsString()
  nombre_Seccion?: string;

  @IsNumber()
  gradoId: number;
}