import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";

@Index("id_estudiante", ["idEstudiante"], {})
@Entity("encargados_legales", { schema: "simadlsc" })
export class EncargadosLegales {
  @PrimaryGeneratedColumn({ type: "int", name: "id_encargados_legales" })
  idEncargadosLegales: number;

  @Column("varchar", { name: "Nombre_Encargado", length: 100 })
  nombreEncargado: string;

  @Column("varchar", { name: "Apellido1_Encargado", length: 100 })
  apellido1Encargado: string;

  @Column("varchar", {
    name: "Apellido2_Encargado",
    nullable: true,
    length: 100,
  })
  apellido2Encargado: string | null;

  @Column("varchar", { name: "Cedula_Encargado", length: 20 })
  cedulaEncargado: string;

  @Column("varchar", {
    name: "Ocupacion_Encargado",
    nullable: true,
    length: 100,
  })
  ocupacionEncargado: string | null;

  @Column("varchar", {
    name: "Direccion_Encargado",
    nullable: true,
    length: 255,
  })
  direccionEncargado: string | null;

  @Column("varchar", { name: "Nacionalidad_Encargado", length: 100 })
  nacionalidadEncargado: string;

  @Column("varchar", { name: "Parentezco_Encargado", length: 100 })
  parentezcoEncargado: string;

  @Column("varchar", { name: "Telefono_Encargado", length: 15 })
  telefonoEncargado: string;

  @Column("varchar", {
    name: "Telefono_habitacion_Encargado",
    nullable: true,
    length: 15,
  })
  telefonoHabitacionEncargado: string | null;

  @Column("varchar", { name: "Email_Encargado", nullable: true, length: 255 })
  emailEncargado: string | null;

  @Column("longblob", {
    name: "Documentos_Obligatorios_Encargado",
    nullable: true,
  })
  documentosObligatoriosEncargado: Buffer | null;

  @Column("varchar", {
    name: "Documentos_Tipo_Encargado",
    nullable: true,
    length: 50,
  })
  documentosTipoEncargado: string | null;

  @Column("int", { name: "id_estudiante" })
  idEstudiante: number;

  @ManyToOne(
    () => Estudiantes,
    (estudiantes) => estudiantes.encargadosLegales,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante2: Estudiantes;
}
