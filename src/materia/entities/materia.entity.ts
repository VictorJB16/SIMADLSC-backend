import { Horario } from 'src/horario/entities/horario.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id_Materia: number;

  @Column({ length: 100 })
  nombre_Materia: string;

  // Relación con Profesores
  @OneToMany(() => Profesor, (profesor) => profesor.materia)
  profesores: Profesor[];

  // Relación con Horarios
  @OneToMany(() => Horario, (horario) => horario.materia)
  horarios: Horario[];
}
