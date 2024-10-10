import { Grado } from 'src/grados/entities/grados-entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  id_Horario: number;

  @Column({ length: 50 })
  dia_semana_Horario: string;

  @Column('time')
  hora_inicio_Horario: string;

  @Column('time')
  hora_fin_Horario: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.horarios, {onDelete: 'CASCADE', nullable: true, eager: true })
  profesor: Profesor;

  @ManyToOne(() => Materia, (materia) => materia.horarios, { eager: false })
  materia: Materia;

  @ManyToOne(() => Grado, (grado) => grado.horarios, { eager: false})
  grado: Grado;

  @ManyToOne(() => Seccion, (seccion) => seccion.horarios, { nullable: true, eager: false })
  seccion: Seccion;

  @ManyToOne(() => Aula, { eager: true })
  aula: Aula;
}
