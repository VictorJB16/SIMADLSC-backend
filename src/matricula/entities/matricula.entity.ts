import { DetalleMatricula } from "src/detallesmatricula/entities/detallesmatricula.entity";
import { EncargadoLegal } from "src/encargado-legal/entities/encargado-legal.entity";

import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Grado } from "src/grados/entities/grados-entity";
import { Seccion } from "src/secciones/entities/seccion.entity";
import { Usuario } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('matriculas')
export class Matricula {

    @PrimaryGeneratedColumn()
    id_Matricula: number;
  
    @Column()
    estado_Matricula: string;
  
    @Column()
    fecha_matricula_Matricula: Date;
  
    @CreateDateColumn()
    fecha_creacion_Matricula: Date;
  
    @UpdateDateColumn()
    fecha_actualizacion_Matricula: Date;
    
   
  
    @ManyToOne(() => Grado, grado => grado.matriculas, { eager: true })
grado: Grado;

  
    @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas)
    estudiantes: Estudiante;
  
    @ManyToOne(() => EncargadoLegal, (encargadoLegal) => encargadoLegal.matriculas)
    encargadoLegal: EncargadoLegal;
  
  //nueva
    @ManyToOne(() => Usuario, (usuario) => usuario.matriculas)
    usuario: Usuario;
  
    //nueva
    @ManyToOne(() => Seccion, (seccion) => seccion.matriculas)
    seccion: Seccion;
  
    @OneToMany(() => DetalleMatricula, (detalleMatricula) => detalleMatricula.matricula, {
        cascade: true,
      })
      detalles: DetalleMatricula[];
  
  }