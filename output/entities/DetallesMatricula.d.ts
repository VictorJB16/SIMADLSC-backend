import { Materias } from "./Materias";
import { Matricula } from "./Matricula";
export declare class DetallesMatricula {
    idDetalleMatricula: number;
    estadoDetalleMatricula: string;
    notaDetalleMatricula: string | null;
    materias: Materias[];
    matriculas: Matricula[];
}
