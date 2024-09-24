import { Periodo } from "./Periodo";
import { TipoEvento } from "./TipoEvento";
import { Ubicaciones } from "./Ubicaciones";
import { Usuario } from "./Usuario";
export declare class Evento {
    idEvento: number;
    nombreEvento: string;
    descripcionEvento: string | null;
    fechaEvento: string;
    horaInicioEvento: string;
    horaFinEvento: string;
    dirigidoAEvento: string | null;
    estadoEvento: string;
    idPeriodo: number;
    idPeriodo2: Periodo;
    tipoEventos: TipoEvento[];
    ubicaciones: Ubicaciones[];
    usuarios: Usuario[];
}
