import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";
import { Horarios } from "./Horarios";
import { Asistencia } from "./Asistencia";
import { Matricula } from "./Matricula";

@Index("id_horario", ["idHorario"], {})
@Index("id_asistencia", ["idAsistencia"], {})
@Entity("grados", { schema: "simadlsc" })
export class Grados {
  @PrimaryGeneratedColumn({ type: "int", name: "id_grado" })
  idGrado: number;

  @Column("varchar", { name: "nombre_grado", length: 100 })
  nombreGrado: string;

  @Column("varchar", { name: "descripcion_Grado", nullable: true, length: 255 })
  descripcionGrado: string | null;

  @Column("int", { name: "id_horario" })
  idHorario: number;

  @Column("int", { name: "id_asistencia" })
  idAsistencia: number;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idGrado2)
  estudiantes: Estudiantes[];

  @ManyToOne(() => Horarios, (horarios) => horarios.grados, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_horario", referencedColumnName: "idHorario" }])
  idHorario2: Horarios;

  @ManyToOne(() => Asistencia, (asistencia) => asistencia.grados, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_asistencia", referencedColumnName: "idAsistencia" }])
  idAsistencia2: Asistencia;

  @OneToMany(() => Matricula, (matricula) => matricula.idGrado2)
  matriculas: Matricula[];
}
