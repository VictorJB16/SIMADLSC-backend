import { DetallesMatricula } from "./DetallesMatricula";
import { Grados } from "./Grados";
export declare class Matricula {
    idMatricula: number;
    estadoMatricula: string;
    otrosDocumentosMatricula: Buffer | null;
    documentosTipoMatricula: string | null;
    fechaMatricula: string;
    idDetalleMatricula: number;
    idGrado: number;
    idDetalleMatricula2: DetallesMatricula;
    idGrado2: Grados;
}
