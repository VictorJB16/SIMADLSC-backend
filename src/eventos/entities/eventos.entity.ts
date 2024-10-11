// src/evento/entities/evento.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstadoEvento } from 'src/estado-evento/entities/estado-evento.entity';
import { Ubicacion } from '../../ubicacion/entities/ubicacion.entity';
import { TipoEvento } from 'src/tipo-evento/entities/tipo-evento.entity';
import { DirigidoA } from 'src/dirigido-a/entities/dirigido-a.entity';
@Entity()
export class Eventos {
  @PrimaryGeneratedColumn()
  id_Evento: number;

  @Column()
  nombre_Evento: string;

  @Column({ nullable: true })
  descripcion_Evento: string;

  @Column()
  fecha_Evento: Date;

  @Column()
  hora_inicio_Evento: string;

  @Column()
  hora_fin_Evento: string;

  @ManyToOne(() => DirigidoA, (dirigidoA) => dirigidoA.eventos, { eager: true })
  @JoinColumn({ name: 'id_dirigido_a' })
  dirigidoA: DirigidoA;

  @ManyToOne(() => EstadoEvento, (estado) => estado.eventos, { eager: true })
  @JoinColumn({ name: 'id_estado_evento' })
  estadoEvento: EstadoEvento;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.eventos, { eager: true })
  @JoinColumn({ name: 'id_ubicacion' })
  ubicacion: Ubicacion;

  @ManyToOne(() => TipoEvento, (tipo) => tipo.eventos, { eager: true })
  @JoinColumn({ name: 'id_tipo_evento' })
  tipoEvento: TipoEvento;
}
