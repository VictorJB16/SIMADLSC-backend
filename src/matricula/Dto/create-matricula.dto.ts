import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateEncargadoLegalDto } from "src/encargado-legal/dto/create-encargado-legal.dto";
import { CreateEstudianteDto } from "src/estudiante/dto/create-estudiante.dto";

export class CreateMatriculaDto {

  
    @IsNotEmpty()  
    @IsString()
      estado_Matricula: string;
      // Datos del Estudiante
      @IsNotEmpty()
      @ValidateNested()
      @Type(() => CreateEstudianteDto)
      estudiante: CreateEstudianteDto;
    
      // Datos del Encargado Legal
      @IsNotEmpty()
      @ValidateNested()
      @Type(() => CreateEncargadoLegalDto)
      encargadoLegal: CreateEncargadoLegalDto;
    }