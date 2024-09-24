import { DetallesMatricula } from "./DetallesMatricula";
import { Horarios } from "./Horarios";
export declare class Materias {
    idMateria: number;
    nombreMateria: string;
    descripcionMateria: string | null;
    idDetalleMatricula: number;
    idHorario: number;
    idDetalleMatricula2: DetallesMatricula;
    idHorario2: Horarios;
}
