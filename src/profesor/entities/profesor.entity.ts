import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Horario } from 'src/horario/entities/horario.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable,OneToOne } from 'typeorm';


@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id_Profesor: number;  

  @Column({ length: 100 })
  nombre_Profesor: string;

  @Column({ length: 100 })
  apellido1_Profesor: string;

  @Column({ length: 100 })
  apellido2_Profesor: string;

  @OneToOne(() => Usuario, (usuario) => usuario.profesor)
  usuario: Usuario;

  @ManyToOne(() => Seccion, (seccion) => seccion.profesores)
  seccion: Seccion;

  @ManyToMany(() => Materia, materia => materia.id_Profesor, { cascade: true })
  @JoinTable({
    name: 'profesor_materia',
    joinColumn: { name: 'id_Profesor', referencedColumnName: 'id_Profesor' },
    inverseJoinColumn: { name: 'id_Materia', referencedColumnName: 'id_Materia' },
  })
  id_Materia: Materia[];

  @OneToMany(() => Horario, (horario) => horario.profesor)
  horarios: Horario[];

  @OneToMany(() => Asistencia, asistencia => asistencia.id_Profesor)
  asistencias: Asistencia[];
}
