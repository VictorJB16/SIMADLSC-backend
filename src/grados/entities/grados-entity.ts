import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('grados')
export class Grado {
  @PrimaryGeneratedColumn()
  id_grado: number;

  @Column()
  nivel: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.grado)
  estudiantes: Estudiante[];

  @OneToMany(() => Horario, (horario) => horario.grado)
  horarios: Horario[];
  
  @ManyToOne(() => Seccion)
  @JoinColumn({ name: 'seccionId' })
  seccion: Seccion;
}
