import { Departamentos } from "./Departamentos";
import { Usuario } from "./Usuario";
import { SeccionesGrado } from "./SeccionesGrado";
import { Horarios } from "./Horarios";
export declare class Profesores {
    idProfesor: number;
    idSeccion: number;
    idMateria: number;
    idHorario: number;
    idUsuario: number;
    departamentos: Departamentos[];
    idUsuario2: Usuario;
    idSeccion2: SeccionesGrado;
    idHorario2: Horarios;
}
