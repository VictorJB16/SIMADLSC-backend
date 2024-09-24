import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetallesMatricula } from "./DetallesMatricula";
import { Grados } from "./Grados";

@Index("id_Detalle_Matricula", ["idDetalleMatricula"], {})
@Index("id_grado", ["idGrado"], {})
@Entity("matricula", { schema: "simadlsc" })
export class Matricula {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Matricula" })
  idMatricula: number;

  @Column("varchar", { name: "estado_Matricula", length: 50 })
  estadoMatricula: string;

  @Column("longblob", { name: "Otros_Documentos_Matricula", nullable: true })
  otrosDocumentosMatricula: Buffer | null;

  @Column("varchar", {
    name: "Documentos_Tipo_Matricula",
    nullable: true,
    length: 50,
  })
  documentosTipoMatricula: string | null;

  @Column("date", { name: "fecha_Matricula" })
  fechaMatricula: string;

  @Column("int", { name: "id_Detalle_Matricula" })
  idDetalleMatricula: number;

  @Column("int", { name: "id_grado" })
  idGrado: number;

  @ManyToOne(
    () => DetallesMatricula,
    (detallesMatricula) => detallesMatricula.matriculas,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    {
      name: "id_Detalle_Matricula",
      referencedColumnName: "idDetalleMatricula",
    },
  ])
  idDetalleMatricula2: DetallesMatricula;

  @ManyToOne(() => Grados, (grados) => grados.matriculas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_grado", referencedColumnName: "idGrado" }])
  idGrado2: Grados;
}
