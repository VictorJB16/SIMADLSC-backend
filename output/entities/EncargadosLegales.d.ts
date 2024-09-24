import { Estudiantes } from "./Estudiantes";
export declare class EncargadosLegales {
    idEncargadosLegales: number;
    nombreEncargado: string;
    apellido1Encargado: string;
    apellido2Encargado: string | null;
    cedulaEncargado: string;
    ocupacionEncargado: string | null;
    direccionEncargado: string | null;
    nacionalidadEncargado: string;
    parentezcoEncargado: string;
    telefonoEncargado: string;
    telefonoHabitacionEncargado: string | null;
    emailEncargado: string | null;
    documentosObligatoriosEncargado: Buffer | null;
    documentosTipoEncargado: string | null;
    idEstudiante: number;
    idEstudiante2: Estudiantes;
}
