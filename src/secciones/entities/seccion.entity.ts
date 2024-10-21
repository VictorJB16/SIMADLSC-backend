
import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Matricula } from 'src/matricula/entities/matricula.entity';

import { Profesor } from 'src/profesor/entities/profesor.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';


@Entity('seccion')
export class Seccion {
  @PrimaryGeneratedColumn()
  id_Seccion: number;

  @Column({ length: 100 })
  nombre_Seccion: string;

  @ManyToOne(() => Grado, (grado) => grado.seccion)
  @JoinColumn({ name: 'gradoId' })
  grado: Grado;
  
  @Column()
  gradoId: number;

  @OneToMany(() => Profesor, (profesor) => profesor.seccion, { onDelete: 'CASCADE' })
  profesores: Profesor[];
  
  @OneToMany(() => Horario, (horario) => horario.seccion)
  horarios: Horario[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.seccion)
  estudiantes: Estudiante[];

  @OneToMany(() => Matricula, (matricula) => matricula.seccion)
  matriculas: Matricula[];
  disponible: boolean;


  @OneToMany(() => Asistencia, asistencia => asistencia.id_Seccion)
  asistencias: Asistencia[];



}

