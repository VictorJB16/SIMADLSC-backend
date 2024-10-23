import { Matricula } from "src/matricula/entities/matricula.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('detalles_matricula')
export class DetallesMatricula {
  @PrimaryGeneratedColumn()
  id_Detalle_Matricula: number;

  @Column()
  estado_Detalle_Matricula: string;

  @Column()
  nota_Detalle_Matricula: string;

  @Column()
  fecha_creacion_Detalle_Matricula: Date;

  @Column()
  fecha_actualizacion_Detalle_Matricula: Date;

  @ManyToOne(() => Matricula, (matricula) => matricula.detalles, {
    nullable: true,
    eager: true,
  })
  matricula: Matricula;
}
