// src/estadoEvento/entities/estado-evento.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Eventos } from 'src/eventos/entities/eventos.entity';
@Entity()
export class EstadoEvento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Eventos, (eventos) => eventos.estadoEvento)
  eventos: Eventos[];
}
