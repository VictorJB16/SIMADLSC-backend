import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateEncargadoLegalDto } from "src/encargado-legal/dto/create-encargado-legal.dto";
import { CreateEstudianteDto } from "src/estudiante/dto/create-estudiante.dto";
import { CreatePeriodoDto } from "src/periodo/dto/create-periodo.dto";
import { EstadoMatricula } from "../entities/Estado-Matricula.enum";

export class CreateMatriculaDto {

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEstudianteDto)
  estudiante: CreateEstudianteDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEncargadoLegalDto)
  encargadoLegal: CreateEncargadoLegalDto;
}