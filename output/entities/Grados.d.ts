import { Estudiantes } from "./Estudiantes";
import { Horarios } from "./Horarios";
import { Asistencia } from "./Asistencia";
import { Matricula } from "./Matricula";
export declare class Grados {
    idGrado: number;
    nombreGrado: string;
    descripcionGrado: string | null;
    idHorario: number;
    idAsistencia: number;
    estudiantes: Estudiantes[];
    idHorario2: Horarios;
    idAsistencia2: Asistencia;
    matriculas: Matricula[];
}
