import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Roles } from 'src/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'nvarchar', length: 100 })
  nombre_Usuario: string;

  @Column({ type: 'nvarchar', length: 100 })
  apellido1_Usuario: string;

  @Column({ type: 'nvarchar', length: 100 })
  apellido2_Usuario: string;

  @Column({ type: 'nvarchar', length: 100, unique: true })
  email_Usuario: string;

  @Column({ type: 'nvarchar', length: 64 })
  contraseña_Usuario: string; // La contraseña será almacenada como hash

  @ManyToOne(() => Roles, (rol) => rol.usuarios)
  rol_Usuario: Roles;

  @Column({ type: 'datetime', nullable: true })
  ultimo_inicio_sesion_Usuario: Date;

  @Column({ type: 'int', default: 0 })
  intentos_inicio_sesion_Usuario: number;

  @Column({ type: 'boolean', default: false })
  bloqueado_Usuario: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion_Usuario: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion_Usuario: Date;


  @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario, { cascade: true ,nullable: true})
  estudiante?: Estudiante;
  
  @OneToOne(() => Profesor, (profesor) => profesor.usuario, { cascade: true, nullable: true})
  profesor?: Profesor;



}
