// src/ubicacion/entities/ubicacion.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Eventos } from 'src/eventos/entities/eventos.entity';

@Entity()
export class Ubicacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Eventos, (eventos) => eventos.ubicacion)
  eventos: Eventos[];
}
