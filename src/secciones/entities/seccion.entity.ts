
import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('secciones')
export class Seccion {
  @PrimaryGeneratedColumn()
  id_Seccion: number;

  @Column({ length: 100 })
  nombre_Seccion: string;

  @OneToMany(() => Profesor, (profesor) => profesor.seccion)
  profesores: Profesor[];

  
  @OneToMany(() => Horario, (horario) => horario.seccion)
  horarios: Horario[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.seccion)
  estudiantes: Estudiante[];

  @OneToMany(() => Asistencia, asistencia => asistencia.id_Seccion)
  asistencias: Asistencia[];

  @ManyToOne(() => Grado, grado => grado.secciones, { onDelete: 'CASCADE' })
  grado: Grado;

}