
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Eventos } from 'src/eventos/entities/eventos.entity';
@Entity()
export class TipoEvento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Eventos, (eventos) => eventos.tipoEvento)
  eventos: Eventos[];
}
