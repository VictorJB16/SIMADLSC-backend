import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Evento } from "./Evento";

@Index("id_evento", ["idEvento"], {})
@Entity("tipo_evento", { schema: "simadlsc" })
export class TipoEvento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_tipo_evento" })
  idTipoEvento: number;

  @Column("varchar", { name: "nombre_Tipo_Evento", length: 100 })
  nombreTipoEvento: string;

  @Column("int", { name: "id_evento" })
  idEvento: number;

  @ManyToOne(() => Evento, (evento) => evento.tipoEventos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_evento", referencedColumnName: "idEvento" }])
  idEvento2: Evento;
}
