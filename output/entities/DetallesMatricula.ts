import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materias } from "./Materias";
import { Matricula } from "./Matricula";

@Entity("detalles_matricula", { schema: "simadlsc" })
export class DetallesMatricula {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Detalle_Matricula" })
  idDetalleMatricula: number;

  @Column("varchar", { name: "estado_Detalle_Matricula", length: 50 })
  estadoDetalleMatricula: string;

  @Column("decimal", {
    name: "nota_Detalle_Matricula",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  notaDetalleMatricula: string | null;

  @OneToMany(() => Materias, (materias) => materias.idDetalleMatricula2)
  materias: Materias[];

  @OneToMany(() => Matricula, (matricula) => matricula.idDetalleMatricula2)
  matriculas: Matricula[];
}
