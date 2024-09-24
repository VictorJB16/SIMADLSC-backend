import { Asistencia } from "./Asistencia";
export declare class JustificacionAusencia {
    idJustificacionAusencia: number;
    motivoJustificacion: string | null;
    fechaJustificacionAusencia: Date | null;
    idAsistencia: number;
    idAsistencia2: Asistencia;
}
