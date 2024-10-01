
import { IsOptional, IsString } from "class-validator";

export class CreateSeccionDto {
  @IsOptional()
  @IsString()
  nombre_Seccion?: string;
