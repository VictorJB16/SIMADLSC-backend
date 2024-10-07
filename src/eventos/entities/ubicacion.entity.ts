// src/events/entities/ubicacion.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Eventos } from './eventos.entity';

@Entity('Ubicaciones')
export class Ubicacion {
  @PrimaryGeneratedColumn()
  id_ubicacion: number;

  @Column({ length: 100 })
  nombre_Ubicacion: string;

  @Column({ length: 255, nullable: true })
  descripcion_Ubicacion: string;

  @ManyToOne(() => Eventos, (eventos) => eventos.ubicaciones, { onDelete: 'CASCADE' })
  evento: Eventos;
}
