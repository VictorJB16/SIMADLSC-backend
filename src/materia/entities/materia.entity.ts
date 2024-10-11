import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id_Materia: number;

  @Column({ length: 100 })
  nombre_Materia: string;

  @ManyToMany(() => Profesor, profesor => profesor.id_Materia)
  id_Profesor: Profesor[];

  // Relación con Horarios
  @OneToMany(() => Horario, (horario) => horario.materia)
  horarios: Horario[];

  @OneToMany(() => Asistencia, asistencia => asistencia.id_Materia)
  asistencias: Asistencia[];
}
