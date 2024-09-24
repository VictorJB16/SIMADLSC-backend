import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Periodo } from "./Periodo";
import { TipoEvento } from "./TipoEvento";
import { Ubicaciones } from "./Ubicaciones";
import { Usuario } from "./Usuario";

@Index("id_Periodo", ["idPeriodo"], {})
@Entity("evento", { schema: "simadlsc" })
export class Evento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Evento" })
  idEvento: number;

  @Column("varchar", { name: "nombre_Evento", length: 255 })
  nombreEvento: string;

  @Column("text", { name: "descripcion_Evento", nullable: true })
  descripcionEvento: string | null;

  @Column("date", { name: "fecha_Evento" })
  fechaEvento: string;

  @Column("time", { name: "hora_inicio_Evento" })
  horaInicioEvento: string;

  @Column("time", { name: "hora_fin_Evento" })
  horaFinEvento: string;

  @Column("varchar", { name: "dirigido_a_Evento", nullable: true, length: 255 })
  dirigidoAEvento: string | null;

  @Column("varchar", { name: "estado_Evento", length: 50 })
  estadoEvento: string;

  @Column("int", { name: "id_Periodo" })
  idPeriodo: number;

  @ManyToOne(() => Periodo, (periodo) => periodo.eventos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }])
  idPeriodo2: Periodo;

  @OneToMany(() => TipoEvento, (tipoEvento) => tipoEvento.idEvento2)
  tipoEventos: TipoEvento[];

  @OneToMany(() => Ubicaciones, (ubicaciones) => ubicaciones.idEvento2)
  ubicaciones: Ubicaciones[];

  @OneToMany(() => Usuario, (usuario) => usuario.idEvento2)
  usuarios: Usuario[];
}
