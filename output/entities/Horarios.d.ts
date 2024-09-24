import { Grados } from "./Grados";
import { Materias } from "./Materias";
import { Profesores } from "./Profesores";
export declare class Horarios {
    idHorario: number;
    diaSemanaHorario: string;
    horaInicioHorario: string;
    horaFinHorario: string;
    grados: Grados[];
    materias: Materias[];
    profesores: Profesores[];
}
