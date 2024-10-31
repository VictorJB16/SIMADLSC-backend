import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { EstadoMatricula } from "../entities/Estado-Matricula.enum";
import { CreateMatriculaDto } from "./create-matricula.dto";
import { PartialType } from "@nestjs/mapped-types";
import { UpdateEstudianteDto } from "src/estudiante/dto/update-estudiante.dto";
import { UpdateEncargadoLegalDto } from "src/encargado-legal/dto/update-encargado-legal.dto";
import { Type } from "class-transformer";
import { CreateEstudianteDto } from "src/estudiante/dto/create-estudiante.dto";
import { CreateEncargadoLegalDto } from "src/encargado-legal/dto/create-encargado-legal.dto";



export class UpdateMatriculaDto extends PartialType(CreateMatriculaDto) {}