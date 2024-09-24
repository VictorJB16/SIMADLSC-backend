import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesMatricula } from "./DetallesMatricula";
import { Horarios } from "./Horarios";

@Index("id_Detalle_Matricula", ["idDetalleMatricula"], {})
@Index("id_horario", ["idHorario"], {})
@Entity("materias", { schema: "simadlsc" })
export class Materias {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Materia" })
  idMateria: number;

  @Column("varchar", { name: "nombre_Materia", length: 100 })
  nombreMateria: string;

  @Column("varchar", {
    name: "descripcion_Materia",
    nullable: true,
    length: 255,
  })
  descripcionMateria: string | null;

  @Column("int", { name: "id_Detalle_Matricula" })
  idDetalleMatricula: number;

  @Column("int", { name: "id_horario" })
  idHorario: number;

  @ManyToOne(
    () => DetallesMatricula,
    (detallesMatricula) => detallesMatricula.materias,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_Detalle_Matricula",
      referencedColumnName: "idDetalleMatricula",
    },
  ])
  idDetalleMatricula2: DetallesMatricula;

  @ManyToOne(() => Horarios, (horarios) => horarios.materias, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_horario", referencedColumnName: "idHorario" }])
  idHorario2: Horarios;
}
