import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Horario } from "src/horario/entities/horario.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class CreateSeccionDto {
  readonly nombre_Seccion: string;
  readonly profesores?: Profesor[];  // opcional si es un array de profesores
  readonly estudiantes?: Estudiante[];  // opcional si es un array de estudiantes
  readonly horarios?: Horario[];  // opcional si es un array de horarios
}