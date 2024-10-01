import { Horario } from 'src/horario/entities/horario.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id_Profesor: number;  

  @ManyToOne(() => Usuario, (usuario) => usuario.profesores)
  usuario: Usuario;

  @ManyToOne(() => Seccion, (seccion) => seccion.profesores)
  seccion: Seccion;

  @ManyToOne(() => Materia, (materia) => materia.profesores)
  materia: Materia;

  @OneToMany(() => Horario, (horario) => horario.profesor)
  horarios: Horario[];
}
