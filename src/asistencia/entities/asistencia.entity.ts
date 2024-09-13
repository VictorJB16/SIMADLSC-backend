//vamos hacer el entities de asistencia

import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn, UpdateDateColumn} from 'typeorm';

/*    
export class CreateAsistenciaDto {
  @IsNotEmpty()
  @IsNumber()
  id_estudiante: number;

  @IsNotEmpty()
  @IsNumber()
  id_seccion: number;

  @IsNotEmpty()
  @IsNumber()
  id_materia: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  detalles_justificacion?: string;
}
/ */ //necesito el entity de esto

@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    id_estudiante: number;  //id del estudiante

    //id de la seccion
    @Column({ type: 'nvarchar', length: 100 })
    id_seccion: number;

    //id de la materia
    @Column({ type: 'nvarchar', length: 100 })
    id_materia: number;

    //fecha de la asistencia
    @Column({ type: 'nvarchar', length: 100 })
    fecha: Date;

    //estado de la asistencia
    @Column({ type: 'nvarchar', length: 100 })
    estado: string;

    //describir la justificacion
    @Column({ type: 'nvarchar', length: 100 })
    detalles_justificacion: string;


}