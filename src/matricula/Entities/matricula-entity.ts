import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { DetalleMatricula } from 'src/detalles_matricula/entities/detalles_matricula-entity';
@Entity('matriculas')
export class Matricula {
  @PrimaryGeneratedColumn()
  id_Matricula: number;

  @Column()
  estado_Matricula: string;

  @Column()
  fecha_matricula_Matricula: Date;

  @Column()
  fecha_creacion_Matricula: Date;

  @Column()
  fecha_actualizacion_Matricula: Date;

  @Column()
  id_grado: number;

  @OneToMany(() => DetalleMatricula, detalle => detalle.matricula)
  detalles: DetalleMatricula[];
}
