
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Matricula } from "src/matricula/entities/matricula.entity";
import { PrimaryGeneratedColumn,Column, OneToMany, Entity } from "typeorm";
//import { Matricula } from "src/matricula/Entities/matricula-entity";

@Entity('encargado_legales')
export class EncargadoLegal {

    @PrimaryGeneratedColumn()
  id_encargado_legal: number;
  
    
  
    
  
  
   
  @Column({ type: 'varchar', length: 50 })
    nombre_Encargado_Legal: string;
  
    
  
    
  @Column({ type: 'varchar', length: 50 })   
  apellido1_Encargado_Legal: string;

  
    @Column({ type: 'varchar', length: 50 })        
  apellido2_Encargado_Legal: string;


  @Column({type:'varchar',length:40})
  N_Cedula: string;
    
  
   
  
  
  @Column({ type: 'varchar', length: 100 })
    ocupacion: string;
  
    
  
   
  
  
  @Column({ type: 'varchar', length: 50 })
    nacionalidad: string;


   @Column({ type: 'varchar', length: 90 }) 
  direccion: string;


@Column()
telefono_celular:number;

@Column({type:'varchar',length:80})
habitacion:string;

@Column({type:'varchar',length:80})
correo:string;


  
   @OneToMany(() => Estudiante, (estudiante) => estudiante.encargadoLegal)
  estudiantes: Estudiante[];

   @OneToMany(() => Matricula, (matricula) => matricula.encargadoLegal)
   matriculas: Matricula[];
}



