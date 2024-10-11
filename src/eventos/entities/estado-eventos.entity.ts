// // src/events/entities/estado-evento.entity.ts

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Eventos } from './eventos.entity';

// @Entity('Estado_Evento')
// export class EstadoEvento {
//   @PrimaryGeneratedColumn()
//   id_estado_evento: number;

//   @Column({ length: 50 })
//   nombre_estado_evento: string;

//   @Column({ length: 255, nullable: true })
//   descripcion_estado_evento: string;

//   @OneToMany(() => Eventos, (eventos) => eventos.estado_Evento)
//   eventos: Eventos[];
// }
