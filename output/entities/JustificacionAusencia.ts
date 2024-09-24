import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asistencia } from "./Asistencia";

@Index("id_Asistencia", ["idAsistencia"], {})
@Entity("justificacion_ausencia", { schema: "simadlsc" })
export class JustificacionAusencia {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Justificacion_Ausencia" })
  idJustificacionAusencia: number;

  @Column("varchar", {
    name: "Motivo_Justificacion",
    nullable: true,
    length: 300,
  })
  motivoJustificacion: string | null;

  @Column("datetime", { name: "fecha_Justificacion_Ausencia", nullable: true })
  fechaJustificacionAusencia: Date | null;

  @Column("int", { name: "id_Asistencia" })
  idAsistencia: number;

  @ManyToOne(
    () => Asistencia,
    (asistencia) => asistencia.justificacionAusencias,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_Asistencia", referencedColumnName: "idAsistencia" }])
  idAsistencia2: Asistencia;
}
