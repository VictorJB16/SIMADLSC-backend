import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Periodo')
export class Periodo {
    @PrimaryGeneratedColumn()
    id_Periodo: number;

    @Column()
    Anio: number;

    @Column()
    nombre_Periodo: string;

    @Column()
    fecha_inicio: Date;

    @Column()
    fecha_fin: Date;
}
