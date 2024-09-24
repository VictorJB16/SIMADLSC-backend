import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Asistencia } from "./Asistencia";
import { Estudiantes } from "./Estudiantes";
import { Evento } from "./Evento";

@Entity("periodo", { schema: "simadlsc" })
export class Periodo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Periodo" })
  idPeriodo: number;

  @Column("int", { name: "Anio" })
  anio: number;

  @Column("varchar", { name: "nombre_Periodo", length: 50 })
  nombrePeriodo: string;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("date", { name: "fecha_fin" })
  fechaFin: string;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.idPeriodo2)
  asistencias: Asistencia[];

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idPeriodo2)
  estudiantes: Estudiantes[];

  @OneToMany(() => Evento, (evento) => evento.idPeriodo2)
  eventos: Evento[];
}
