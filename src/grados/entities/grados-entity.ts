import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Matricula } from 'src/matricula/entities/matricula.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('grados')
export class Grado {
  @PrimaryGeneratedColumn()
  id_grado: number;

  @Column()
  nivel: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.grado)
  estudiantes: Estudiante[];

  @OneToMany(() => Matricula, (matricula) => matricula.grado)
  matriculas: Matricula[];

  @OneToMany(() => Horario, (horario) => horario.grado)
  horarios: Horario[];
}
