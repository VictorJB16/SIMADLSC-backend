
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Horario } from 'src/horario/entities/horario.entity';
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

  // Relación con Profesores (Una sección puede tener varios profesores)
  @OneToMany(() => Profesor, (profesor) => profesor.seccion)
  profesores: Profesor[];

  // Relación con Horarios
  @OneToMany(() => Horario, (horario) => horario.seccion)
  horarios: Horario[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.seccion)
  estudiantes: Estudiante[];

}