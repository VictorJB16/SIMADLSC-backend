import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from 'class-validator';

@Entity('aulas')
export class Aula {
    @PrimaryGeneratedColumn()
    id_aula: number;

    @Column()
    nombre_Aula: string;
}
