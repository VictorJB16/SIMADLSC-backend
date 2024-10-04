// src/events/entities/evento.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EstadoEvento } from './estado-eventos.entity';
import { DirigidoA } from './dirigido-a.entity';
import { TipoEvento } from './tipo-eventos.entity';
import { Ubicacion } from './ubicacion.entity';

@Entity('Eventos')
export class Eventos {
  @PrimaryGeneratedColumn()
  id_Evento: number;

  @Column({ length: 255 })
  nombre_Evento: string;

  @Column('text', { nullable: true })
  descripcion_Evento: string;

  @Column({ type: 'date' })
  fecha_Evento: Date;

  @Column({ type: 'time' })
  hora_inicio_Evento: string;

  @Column({ type: 'time' })
  hora_fin_Evento: string;

  @Column()
  id_estado_evento: number;

  @Column()
  id_dirigido_a: number;

  @ManyToOne(() => EstadoEvento, (estadoEvento) => estadoEvento.eventos, { eager: true })
  estado_Evento: EstadoEvento;

  @ManyToOne(() => DirigidoA, (dirigidoA) => dirigidoA.eventos, { eager: true })
  dirigido_a_Evento: DirigidoA;

  @OneToMany(() => TipoEvento, (tipoEvento) => tipoEvento.evento, { cascade: true })
  tipo_Eventos: TipoEvento[];

  @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.evento, { cascade: true })
  ubicaciones: Ubicacion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
