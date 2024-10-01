import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('secciones')
export class Seccion {
  @PrimaryGeneratedColumn()
  id_Seccion: number;

  @Column({ length: 100 })
  nombre_Seccion: string;

  // Relación con Profesores (Una sección puede tener varios profesores)
  @OneToMany(() => Profesor, (profesor) => profesor.seccion)
  profesores: Profesor[];

  // Relación con Horarios
  @OneToMany(() => Horario, (horario) => horario.seccion)
  horarios: Horario[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.seccion)
  estudiantes: Estudiante[];
}
