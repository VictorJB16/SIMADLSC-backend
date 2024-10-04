import { IsNotEmpty, IsString } from "class-validator";

export class CreateEstudianteDto {

    @IsNotEmpty()
    @IsString()
    nombre_Estudiante: string;
    
    @IsNotEmpty()
    @IsString()
    apellido1_Estudiante: string;

    @IsNotEmpty()
    @IsString()
    apellido2_Estudiante: string;
}
