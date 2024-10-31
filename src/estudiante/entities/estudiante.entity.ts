import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Matricula } from 'src/matricula/entities/matricula.entity';
//import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { tipoadecuacion } from './tipo-adecuacion.enum';

@Entity('estudiantes')
export class Estudiante {

  @PrimaryGeneratedColumn()
  id_Estudiante: number;

  @Column({ type: 'varchar', length: 50 })
  nombre_Estudiante: string;

  @Column({ type: 'varchar', length: 50 })
  apellido1_Estudiante: string;

  @Column({ type: 'varchar', length: 50 })
  apellido2_Estudiante: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'varchar', length: 50 })
  nacionalidad: string;

  @Column({ type: 'varchar', length: 15 })
  telefono: string;

  @Column({ default: "Activo" })
  estado_Estudiante?: string;

  @Column({ type: 'varchar', length: 40 })
  cedula: string;

  @Column({ type: 'date'})
  fecha_nacimiento: string;

  @Column({ type: 'varchar', length: 50 })
  correo_estudiantil?: string;

  @Column({ type: 'varchar', length: 10 })
  sexo: string;

  @Column({ type: 'varchar', length: 80 })
  lugar_de_nacimiento: string;

  @Column({ type: 'varchar', length: 80 })
  condicion_migratoria: string;

  @Column({ type: 'varchar', length: 80 })
  Repite_alguna_materia: string;

  @Column({ type: 'varchar', length: 80 })
  institucion_de_procedencia: string;

  @Column({ type: 'varchar', length: 80 })
  Presenta_alguna_enfermedad: string;

  @Column({ type: 'varchar', length: 80 })
  medicamentos_que_debe_tomar: string;

  @Column({ type: 'varchar', length: 80 })
  Ruta_de_viaje: string;

  @Column({
    type: 'enum',
    enum: tipoadecuacion,
    default: tipoadecuacion.nopresenta,
  })
  tipo_de_adecuacion: tipoadecuacion;

  @Column({ type: 'varchar', length: 50 })
  recibe_religion?: string;

  @Column({ type: 'varchar', length: 50 })
  presenta_carta?: string;


  @ManyToOne(() => Seccion, (seccion) => seccion.estudiantes)
  seccion: Seccion;

  @OneToOne(() => Usuario, (usuario) => usuario.estudiante, { onDelete: 'CASCADE' })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Grado, (grado) => grado.estudiantes)
  grado: Grado;

  @ManyToOne(() => EncargadoLegal, (encargadoLegal) => encargadoLegal.estudiantes)
  encargadoLegal: EncargadoLegal;

  @OneToMany(() => Matricula, (matricula) => matricula.estudiante, {cascade: true,})
  matriculas: Matricula[];

  @OneToMany(() => Asistencia, asistencia => asistencia.id_Estudiante)
  asistencias: Asistencia[];
}