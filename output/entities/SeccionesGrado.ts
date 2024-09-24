import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profesores } from "./Profesores";

@Entity("secciones_grado", { schema: "simadlsc" })
export class SeccionesGrado {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Seccion" })
  idSeccion: number;

  @Column("varchar", { name: "nombre_Seccion", length: 100 })
  nombreSeccion: string;

  @Column("int", { name: "id_Estudiante" })
  idEstudiante: number;

  @Column("int", { name: "id_grado" })
  idGrado: number;

  @Column("int", { name: "id_asistencia" })
  idAsistencia: number;

  @Column("int", { name: "id_horario" })
  idHorario: number;

  @OneToMany(() => Profesores, (profesores) => profesores.idSeccion2)
  profesores: Profesores[];
}
