import { Usuario } from "./Usuario";
export declare class SeguridadEvento {
    idSeguridad: number;
    eventoSeguridad: string;
    fechaEvento: Date;
    ipUsuario: string;
    usuarios: Usuario[];
}
