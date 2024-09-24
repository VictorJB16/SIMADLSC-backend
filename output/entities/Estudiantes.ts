import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EncargadosLegales } from "./EncargadosLegales";
import { Usuario } from "./Usuario";
import { Grados } from "./Grados";
import { Asistencia } from "./Asistencia";
import { Periodo } from "./Periodo";

@Index("id_Usuario", ["idUsuario"], {})
@Index("id_grado", ["idGrado"], {})
@Index("id_Asistencia", ["idAsistencia"], {})
@Index("id_Periodo", ["idPeriodo"], {})
@Entity("estudiantes", { schema: "simadlsc" })
export class Estudiantes {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Estudiante" })
  idEstudiante: number;

  @Column("varchar", { name: "estado_Estudiante", length: 50 })
  estadoEstudiante: string;

  @Column("varchar", {
    name: "Institucion_de_procedencia_Estudiante",
    nullable: true,
    length: 255,
  })
  institucionDeProcedenciaEstudiante: string | null;

  @Column("tinyint", { name: "Repite_materia_Estudiante", width: 1 })
  repiteMateriaEstudiante: boolean;

  @Column("varchar", { name: "Lugar_Nacimiento_Estudiante", length: 255 })
  lugarNacimientoEstudiante: string;

  @Column("varchar", { name: "Estatus_Migratorio_Estudiante", length: 100 })
  estatusMigratorioEstudiante: string;

  @Column("tinyint", { name: "Adecuacion_Estudiante", width: 1 })
  adecuacionEstudiante: boolean;

  @Column("varchar", {
    name: "Tipo_Adecuacion_Estudiante",
    nullable: true,
    length: 255,
  })
  tipoAdecuacionEstudiante: string | null;

  @Column("tinyint", { name: "Recibe_religion_Estudiante", width: 1 })
  recibeReligionEstudiante: boolean;

  @Column("longblob", { name: "Carta_religion_Estudiante", nullable: true })
  cartaReligionEstudiante: Buffer | null;

  @Column("varchar", {
    name: "Carta_religion_Tipo",
    nullable: true,
    length: 50,
  })
  cartaReligionTipo: string | null;

  @Column("longblob", { name: "Presenta_dictamen_Estudiante", nullable: true })
  presentaDictamenEstudiante: Buffer | null;

  @Column("varchar", { name: "Dictamen_Tipo", nullable: true, length: 50 })
  dictamenTipo: string | null;

  @Column("longblob", { name: "Documentos_Obligatorios_Est", nullable: true })
  documentosObligatoriosEst: Buffer | null;

  @Column("varchar", { name: "Documentos_Tipo", nullable: true, length: 50 })
  documentosTipo: string | null;

  @Column("varchar", { name: "Enfermedad_Estudiante", length: 255 })
  enfermedadEstudiante: string;

  @Column("varchar", {
    name: "Medicamentos_Estudiante",
    nullable: true,
    length: 255,
  })
  medicamentosEstudiante: string | null;

  @Column("varchar", {
    name: "Ruta_viaje_Estudiante",
    nullable: true,
    length: 255,
  })
  rutaViajeEstudiante: string | null;

  @Column("int", { name: "id_Usuario" })
  idUsuario: number;

  @Column("int", { name: "id_grado" })
  idGrado: number;

  @Column("int", { name: "id_Asistencia" })
  idAsistencia: number;

  @Column("int", { name: "id_Periodo" })
  idPeriodo: number;

  @OneToMany(
    () => EncargadosLegales,
    (encargadosLegales) => encargadosLegales.idEstudiante2
  )
  encargadosLegales: EncargadosLegales[];

  @ManyToOne(() => Usuario, (usuario) => usuario.estudiantes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Grados, (grados) => grados.estudiantes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_grado", referencedColumnName: "idGrado" }])
  idGrado2: Grados;

  @ManyToOne(() => Asistencia, (asistencia) => asistencia.estudiantes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Asistencia", referencedColumnName: "idAsistencia" }])
  idAsistencia2: Asistencia;

  @ManyToOne(() => Periodo, (periodo) => periodo.estudiantes, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Periodo", referencedColumnName: "idPeriodo" }])
  idPeriodo2: Periodo;
}
