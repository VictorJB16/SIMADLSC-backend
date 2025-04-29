import { EncargadoLegal } from "src/encargado-legal/entities/encargado-legal.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Seccion } from "src/secciones/entities/seccion.entity";
import { Usuario } from "src/users/entities/user.entity";
import { Column,  Entity, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { EstadoMatricula } from "./Estado-Matricula.enum";

@Entity('matriculas')
export class Matricula {

    @PrimaryGeneratedColumn()
    id_Matricula: number;
  
    @Column({type:'date' })
    fecha_creacion_Matricula: string;
  
    @Column({type:'date' })
    fecha_actualizacion_Matricula: string;

    @Column({
        type: 'enum',
        enum: EstadoMatricula,
        default: EstadoMatricula.Pendiente,
      })
      estado_Matricula: EstadoMatricula;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas)
    estudiante: Estudiante;
  
    @ManyToOne(() => EncargadoLegal, (encargadoLegal) => encargadoLegal.matriculas)
    encargadoLegal: EncargadoLegal;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.matriculas)
    usuario: Usuario;
    
    @ManyToOne(() => Seccion, (seccion) => seccion.matriculas)
    seccion: Seccion;

    @Column('simple-array', { nullable: true })
    archivos?: string[];
  
    }