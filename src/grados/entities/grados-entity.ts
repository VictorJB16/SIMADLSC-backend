import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grados')
export class Grado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;
}
