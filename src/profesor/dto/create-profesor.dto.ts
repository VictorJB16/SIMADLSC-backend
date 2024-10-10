import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfesorDto {


    @IsNotEmpty()
    @IsString()
    nombre_Profesor: string;


    @IsNotEmpty()
    @IsString()
    apellido1_Profesor: string;


    @IsNotEmpty()
    @IsString()
    apellido2_Profesor: string;

    // Campo adicional para vincular el Profesor con un Usuario
    @IsNumber()
    @IsOptional()  // Esto significa que este campo puede ser omitido
    usuarioId?: number;
}
