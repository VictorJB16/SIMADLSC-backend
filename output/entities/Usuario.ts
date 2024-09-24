import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";
import { Profesores } from "./Profesores";
import { Evento } from "./Evento";
import { SeguridadEvento } from "./SeguridadEvento";
import { UsuarioRol } from "./UsuarioRol";

@Index("id_evento", ["idEvento"], {})
@Index("id_seguridad", ["idSeguridad"], {})
@Entity("usuario", { schema: "simadlsc" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Usuario" })
  idUsuario: number;

  @Column("varchar", { name: "nombre_Usuario", length: 100 })
  nombreUsuario: string;

  @Column("varchar", { name: "apellido1_Usuario", length: 100 })
  apellido1Usuario: string;

  @Column("varchar", { name: "apellido2_Usuario", nullable: true, length: 100 })
  apellido2Usuario: string | null;

  @Column("date", { name: "fecha_nacimiento_Usuario" })
  fechaNacimientoUsuario: string;

  @Column("varchar", { name: "contacto_Usuario", nullable: true, length: 35 })
  contactoUsuario: string | null;

  @Column("varchar", { name: "email_Usuario", length: 255 })
  emailUsuario: string;

  @Column("varchar", { name: "cedula_Usuario", length: 40 })
  cedulaUsuario: string;

  @Column("varchar", { name: "contraseña_Usuario", length: 255 })
  contraseAUsuario: string;

  @Column("varchar", { name: "rol_Usuario", length: 50 })
  rolUsuario: string;

  @Column("tinyint", {
    name: "bloqueo_Usuario",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  bloqueoUsuario: boolean | null;

  @Column("int", { name: "id_evento" })
  idEvento: number;

  @Column("int", { name: "id_seguridad" })
  idSeguridad: number;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idUsuario2)
  estudiantes: Estudiantes[];

  @OneToMany(() => Profesores, (profesores) => profesores.idUsuario2)
  profesores: Profesores[];

  @ManyToOne(() => Evento, (evento) => evento.usuarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_evento", referencedColumnName: "idEvento" }])
  idEvento2: Evento;

  @ManyToOne(
    () => SeguridadEvento,
    (seguridadEvento) => seguridadEvento.usuarios,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_seguridad", referencedColumnName: "idSeguridad" }])
  idSeguridad2: SeguridadEvento;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.idUsuario2)
  usuarioRols: UsuarioRol[];
}
