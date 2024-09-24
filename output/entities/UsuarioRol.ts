import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Roles } from "./Roles";

@Index("id_Usuario", ["idUsuario"], {})
@Index("id_Rol", ["idRol"], {})
@Entity("usuario_rol", { schema: "simadlsc" })
export class UsuarioRol {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Usuario_Rol" })
  idUsuarioRol: number;

  @Column("int", { name: "id_Rol" })
  idRol: number;

  @Column("int", { name: "id_Usuario" })
  idUsuario: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRols, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Usuario", referencedColumnName: "idUsuario" }])
  idUsuario2: Usuario;

  @ManyToOne(() => Roles, (roles) => roles.usuarioRols, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_Rol", referencedColumnName: "idRol" }])
  idRol2: Roles;
}
