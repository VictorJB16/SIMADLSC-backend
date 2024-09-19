import { Usuario } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id_Rol: number;

  @Column({ type: 'nvarchar', length: 100 })
  nombre_Rol: string;

  @OneToMany(() => Usuario, usuario => usuario.rol_Usuario)
  usuarios: Usuario[];
}
