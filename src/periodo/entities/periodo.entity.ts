import { Matricula } from 'src/matricula/entities/matricula.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('periodos')
export class Periodo {
    @PrimaryGeneratedColumn()
    id_Periodo: number;

    @Column({ length: 100 })
    nombre_Periodo: string;

    @OneToMany(() => Matricula, (matricula) => matricula.periodo)
    matriculas: Matricula[];

}
