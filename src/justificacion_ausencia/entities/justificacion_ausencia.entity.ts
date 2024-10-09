import { Asistencia } from "src/asistencias/entities/asistencia.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  OneToOne,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('justificacion_ausencia')
export class JustificacionAusencia {

    @PrimaryGeneratedColumn()
    justificacion_ausencia_id: number;
  
    @Column()
    descripcion: string;
  
    @Column({ type: 'date' })
    fecha: Date;
  
    @OneToOne(() => Asistencia, asistencia => asistencia.justificacionAusencia, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'asistencia_id' })
    asistencia: Asistencia;
  
    @CreateDateColumn()
    creadoEn: Date;
  
    @UpdateDateColumn()
    actualizadoEn: Date;
}
