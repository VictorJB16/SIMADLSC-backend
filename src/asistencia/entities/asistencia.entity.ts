import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    id_estudiante: number;  //id del estudiante

    //id de la seccion
    @Column({ type: 'nvarchar', length: 100 })
    id_seccion: number;

    //id de la materia
    @Column({ type: 'nvarchar', length: 100 })
    id_materia: number;

    //fecha de la asistencia
    @Column({ type: 'nvarchar', length: 100 })
    fecha: Date;

    //estado de la asistencia
    @Column({ type: 'nvarchar', length: 100 })
    estado: string;

    //describir la justificacion
    @Column({ type: 'nvarchar', length: 100 })
    detalles_justificacion: string;


}