import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioRol } from "./UsuarioRol";

@Entity("roles", { schema: "simadlsc" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Rol" })
  idRol: number;

  @Column("varchar", { name: "nombre_Rol", length: 100 })
  nombreRol: string;

  @Column("varchar", { name: "descripcion_Rol", nullable: true, length: 255 })
  descripcionRol: string | null;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.idRol2)
  usuarioRols: UsuarioRol[];
}
