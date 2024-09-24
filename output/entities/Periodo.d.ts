import { Asistencia } from "./Asistencia";
import { Estudiantes } from "./Estudiantes";
import { Evento } from "./Evento";
export declare class Periodo {
    idPeriodo: number;
    anio: number;
    nombrePeriodo: string;
    fechaInicio: string;
    fechaFin: string;
    asistencias: Asistencia[];
    estudiantes: Estudiantes[];
    eventos: Evento[];
}
