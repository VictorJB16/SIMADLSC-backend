import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profesores } from "./Profesores";

@Index("id_Profesor", ["idProfesor"], {})
@Entity("departamentos", { schema: "simadlsc" })
export class Departamentos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Departamento" })
  idDepartamento: number;

  @Column("varchar", { name: "nombre_departamento", length: 100 })
  nombreDepartamento: string;

  @Column("int", { name: "id_Profesor" })
  idProfesor: number;

  @ManyToOne(() => Profesores, (profesores) => profesores.departamentos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Profesor", referencedColumnName: "idProfesor" }])
  idProfesor2: Profesores;
}
