// src/events/entities/tipo-evento.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Eventos } from './eventos.entity';

@Entity('Tipo_Evento')
export class TipoEvento {
  @PrimaryGeneratedColumn()
  id_tipo_evento: number;

  @Column({ length: 100 })
  nombre_Tipo_Evento: string;

  @ManyToOne(() => Eventos, (eventos) => eventos.tipo_Eventos, { onDelete: 'CASCADE' })
  evento: Eventos;
}
