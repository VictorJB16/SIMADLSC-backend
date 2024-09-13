import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'nvarchar', length: 100 })
  nombre_completo: string;

  @Column({ type: 'nvarchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 20 })
  cedula: string
  @Column({ type: 'nvarchar', length: 64 })
  contrasena: string; // La contraseña será almacenada como hash

  @Column({ type: 'nvarchar', length: 50, default: 'user' })
  rol: string;

  @Column({ type: 'bit', default: false })
  bloqueado: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
}
