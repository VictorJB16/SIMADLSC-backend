import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("seguridad_evento", { schema: "simadlsc" })
export class SeguridadEvento {
  @PrimaryGeneratedColumn({ type: "int", name: "id_Seguridad" })
  idSeguridad: number;

  @Column("varchar", { name: "evento_Seguridad", length: 255 })
  eventoSeguridad: string;

  @Column("datetime", { name: "fecha_evento" })
  fechaEvento: Date;

  @Column("varchar", { name: "ip_usuario", length: 45 })
  ipUsuario: string;

  @OneToMany(() => Usuario, (usuario) => usuario.idSeguridad2)
  usuarios: Usuario[];
}
