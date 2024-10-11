import {  IsNotEmpty } from "class-validator";

export class CreateJustificacionAusenciaDto {

    @IsNotEmpty()
    descripcion: string;
  
}
