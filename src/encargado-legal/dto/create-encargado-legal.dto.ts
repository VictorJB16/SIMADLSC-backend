import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEncargadoLegalDto {

    

  
    @IsNotEmpty()
    @IsString()
    nombre_Encargado_Legal: string;

    

    
@IsNotEmpty()
    @IsString()
    apellido1_Encargado_Legal: string;

    

    
@IsNotEmpty()
    @IsString()
    apellido2_Encargado_Legal: string;

      
    @IsNotEmpty()       
    @IsString()
    N_Cedula: string;



@IsNotEmpty()  
@IsString()
    ocupacion: string;

    

    
@IsNotEmpty()
    @IsString()  
nacionalidad: string;




  
  


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
