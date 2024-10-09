import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateJustificacionAusenciaDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
    @IsDateString()
    @IsNotEmpty()
    fecha: string;
}
