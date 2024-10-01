import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('secciones')
export class Seccion {
    @PrimaryGeneratedColumn()
  id: number;
@IsNotEmpty()
nombre: string 

}
