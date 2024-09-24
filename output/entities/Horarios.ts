import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grados } from "./Grados";
import { Materias } from "./Materias";
import { Profesores } from "./Profesores";

@Entity("horarios", { schema: "simadlsc" })
export class Horarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Horario" })
  idHorario: number;

  @Column("varchar", { name: "dia_semana_Horario", length: 50 })
  diaSemanaHorario: string;

  @Column("time", { name: "hora_inicio_Horario" })
  horaInicioHorario: string;

  @Column("time", { name: "hora_fin_Horario" })
  horaFinHorario: string;

  @OneToMany(() => Grados, (grados) => grados.idHorario2)
  grados: Grados[];

  @OneToMany(() => Materias, (materias) => materias.idHorario2)
  materias: Materias[];

  @OneToMany(() => Profesores, (profesores) => profesores.idHorario2)
  profesores: Profesores[];
}
