import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departamentos } from "./Departamentos";
import { Usuario } from "./Usuario";
import { SeccionesGrado } from "./SeccionesGrado";
import { Horarios } from "./Horarios";

@Index("id_Usuario", ["idUsuario"], {})
@Index("id_seccion", ["idSeccion"], {})
@Index("id_Horario", ["idHorario"], {})
@Entity("profesores", { schema: "simadlsc" })
export class Profesores {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Profesor" })
  idProfesor: number;

  @Column("int", { name: "id_seccion" })
  idSeccion: number;

  @Column("int", { name: "id_Materia" })
  idMateria: number;

  @Column("int", { name: "id_Horario" })
  idHorario: number;

  @Column("int", { name: "id_Usuario" })
  idUsuario: number;

  @OneToMany(() => Departamentos, (departamentos) => departamentos.idProfesor2)
  departamentos: Departamentos[];

  @ManyToOne(() => Usuario, (usuario) => usuario.profesores, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(
    () => SeccionesGrado,
    (seccionesGrado) => seccionesGrado.profesores,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_seccion", referencedColumnName: "idSeccion" }])
  idSeccion2: SeccionesGrado;

  @ManyToOne(() => Horarios, (horarios) => horarios.profesores, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Horario", referencedColumnName: "idHorario" }])
  idHorario2: Horarios;
}
