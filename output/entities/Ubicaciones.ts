import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Evento } from "./Evento";

@Index("id_Evento", ["idEvento"], {})
@Entity("ubicaciones", { schema: "simadlsc" })
export class Ubicaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ubicacion" })
  idUbicacion: number;

  @Column("varchar", { name: "nombre_Ubicacion", length: 100 })
  nombreUbicacion: string;

  @Column("varchar", {
    name: "descripcion_Ubicacion",
    nullable: true,
    length: 255,
  })
  descripcionUbicacion: string | null;

  @Column("int", { name: "id_Evento" })
  idEvento: number;

  @ManyToOne(() => Evento, (evento) => evento.ubicaciones, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Evento", referencedColumnName: "idEvento" }])
  idEvento2: Evento;
}
