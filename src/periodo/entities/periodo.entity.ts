import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Matricula } from 'src/matricula/entities/matricula.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('periodos')
export class Periodo {
    @PrimaryGeneratedColumn()
    id_Periodo: number;

    @Column({ length: 100 })
    nombre_Periodo: string;
    
    @OneToMany(() => Asistencia, (asistencia) => asistencia.id_Periodo)
    asistencias: Asistencia[]

}
