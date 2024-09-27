import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  id_Horario: number;

  @Column({ length: 50 })
  dia_semana_Horario: string;

  @Column('time')
  hora_inicio_Horario: string;

  @Column('time')
  hora_fin_Horario: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.horarios, { nullable: true })
  profesor: Profesor;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.horarios, { nullable: true })
  estudiante: Estudiante;

  @ManyToOne(() => Materia, (materia) => materia.horarios)
  materia: Materia;

  @ManyToOne(() => Grado, (grado) => grado.horarios)
  grado: Grado;

  @ManyToOne(() => Seccion, (seccion) => seccion.horarios)
  seccion: Seccion;
}
