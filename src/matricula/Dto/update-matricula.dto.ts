import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateMatriculaDto {

    @IsNotEmpty()
    @IsNumber()
    id_grado: number;
    
    @IsNotEmpty()
    @IsString()
    nivel: string;

    @IsNotEmpty()
    @IsNumber()
    id_Seccion: number;

    @IsNotEmpty()
    @IsString()
    nombre_Seccion: string;

    @IsNotEmpty()
    @IsString()
    direccion: string;
    
    @IsNotEmpty()
    @IsNumber()
    telefono_celular:number;
    
    @IsNotEmpty()
    @IsString()
    habitacion:string;
    
    @IsNotEmpty()
    @IsString()
    correo:string;
    























}