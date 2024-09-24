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
import { Estudiantes } from "./Estudiantes";
import { Grados } from "./Grados";
import { JustificacionAusencia } from "./JustificacionAusencia";

@Index("id_Periodo", ["idPeriodo"], {})
@Entity("asistencia", { schema: "simadlsc" })
export class Asistencia {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Asistencia" })
  idAsistencia: number;

  @Column("datetime", {
    name: "fecha_asistencia",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaAsistencia: Date | null;

  @Column("varchar", { name: "estado_asistencia", length: 255 })
  estadoAsistencia: string;

  @Column("varchar", {
    name: "observaciones_asistencia",
    nullable: true,
    length: 255,
  })
  observacionesAsistencia: string | null;

  @Column("int", { name: "id_Periodo" })
  idPeriodo: number;

  @ManyToOne(() => Periodo, (periodo) => periodo.asistencias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }])
  idPeriodo2: Periodo;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idAsistencia2)
  estudiantes: Estudiantes[];

  @OneToMany(() => Grados, (grados) => grados.idAsistencia2)
  grados: Grados[];

  @OneToMany(
    () => JustificacionAusencia,
    (justificacionAusencia) => justificacionAusencia.idAsistencia2
  )
  justificacionAusencias: JustificacionAusencia[];
}
