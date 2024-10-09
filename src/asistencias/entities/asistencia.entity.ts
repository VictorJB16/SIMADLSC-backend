import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { AsistenciaStatus } from './asistencia-status.enum';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { JustificacionAusencia } from 'src/justificacion_ausencia/entities/justificacion_ausencia.entity';


@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn()
  asistencia_id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: AsistenciaStatus,
    default: AsistenciaStatus.PRESENTE,
  })
  estado: AsistenciaStatus;

  @ManyToOne(() => Estudiante, estudiante => estudiante.asistencias, { eager: true, onDelete: 'CASCADE' })
  id_Estudiante: Estudiante;

  @ManyToOne(() => Materia, materia => materia.asistencias, { eager: true, onDelete: 'CASCADE' })
  id_Materia: Materia;

  @ManyToOne(() => Grado, grado => grado.asistencias, { eager: true, onDelete: 'CASCADE' })
  id_grado: Grado;

  @ManyToOne(() => Seccion, seccion => seccion.asistencias, { eager: true, onDelete: 'CASCADE' })
  id_Seccion: Seccion;

  @ManyToOne(() => Profesor, profesor => profesor.asistencias, { eager: true, onDelete: 'CASCADE' })
  id_Profesor: Profesor;

  @OneToOne(() => JustificacionAusencia, justificacion => justificacion.asistencia, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'justificacion_ausencia_id' })
  justificacionAusencia: JustificacionAusencia;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
