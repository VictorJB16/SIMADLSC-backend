import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id_Estudiante: number;
  
  @Column({ length: 100 })
  nombre_Estudiante: string;

  @Column({ length: 50 })
  apellido1_Estudiante: string;
  
  @Column({ length: 50 })
  apellido2_Estudiante: string;
  
  @Column({ default:"Activo" })
  estado_Estudiante?: string;
  
  // En Estudiante
@OneToOne(() => Usuario, (usuario) => usuario.estudiante)
usuario: Usuario;

  @ManyToOne(() => Grado, (grado) => grado.estudiantes)
  grado: Grado;

  @ManyToOne(() => Seccion, (seccion) => seccion.estudiantes)
  seccion: Seccion;

  @OneToMany(() => Asistencia, asistencia => asistencia.id_Estudiante)
  asistencias: Asistencia[];
}