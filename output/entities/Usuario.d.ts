import { Estudiantes } from "./Estudiantes";
import { Profesores } from "./Profesores";
import { Evento } from "./Evento";
import { SeguridadEvento } from "./SeguridadEvento";
import { UsuarioRol } from "./UsuarioRol";
export declare class Usuario {
    idUsuario: number;
    nombreUsuario: string;
    apellido1Usuario: string;
    apellido2Usuario: string | null;
    fechaNacimientoUsuario: string;
    contactoUsuario: string | null;
    emailUsuario: string;
    cedulaUsuario: string;
    contraseAUsuario: string;
    rolUsuario: string;
    bloqueoUsuario: boolean | null;
    idEvento: number;
    idSeguridad: number;
    estudiantes: Estudiantes[];
    profesores: Profesores[];
    idEvento2: Evento;
    idSeguridad2: SeguridadEvento;
    usuarioRols: UsuarioRol[];
}
