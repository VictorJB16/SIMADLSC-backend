import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('periodos')
export class Periodo {
    @PrimaryGeneratedColumn()
    id_Periodo: number;

    @Column({ length: 100 })
    nombre_Periodo: string;

}
