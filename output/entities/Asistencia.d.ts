import { Periodo } from "./Periodo";
import { Estudiantes } from "./Estudiantes";
import { Grados } from "./Grados";
import { JustificacionAusencia } from "./JustificacionAusencia";
export declare class Asistencia {
    idAsistencia: number;
    fechaAsistencia: Date | null;
    estadoAsistencia: string;
    observacionesAsistencia: string | null;
    idPeriodo: number;
    idPeriodo2: Periodo;
    estudiantes: Estudiantes[];
    grados: Grados[];
    justificacionAusencias: JustificacionAusencia[];
}
