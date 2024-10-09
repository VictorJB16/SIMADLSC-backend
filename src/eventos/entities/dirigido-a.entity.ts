// // src/events/entities/dirigido-a.entity.ts

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Eventos } from './eventos.entity';

// @Entity('Dirigido_A')
// export class DirigidoA {
//   @PrimaryGeneratedColumn()
//   id_dirigido_a: number;

//   @Column({ length: 255 })
//   nombre_dirigido_a: string;

//   @Column({ length: 255, nullable: true })
//   descripcion_dirigido_a: string;

//   @OneToMany(() => Eventos, (eventos) => eventos.dirigido_a_Evento)
//   eventos: Eventos[];
// }
