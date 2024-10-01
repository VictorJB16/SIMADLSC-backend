import { Grado } from 'src/grados/entities/grados-entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id_Estudiante: number;

  @Column({ length: 50 })
  estado_Estudiante: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.estudiantes)
  usuario: Usuario;

  @ManyToOne(() => Grado, (grado) => grado.estudiantes)
  grado: Grado;

  @OneToMany(() => Horario, (horario) => horario.estudiante)
  horarios: Horario[];

  @ManyToOne(() => Seccion, (seccion) => seccion.estudiantes)
  seccion: Seccion;
}