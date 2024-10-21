
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

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

  @IsOptional()
  @IsString()
  estado_Estudiante?: string;

  @IsNotEmpty()
  @IsNumber()
  seccionId: number;

  @IsNotEmpty()
  @IsNumber()
  gradoId: number;

  @IsNotEmpty()    
  @IsString()
  Cedula: string;

  @IsNotEmpty()    
  @IsString()
  correo_estudiantil: string;

  @IsNotEmpty()   
  @IsString()   
  fecha_nacimiento: string;

  @IsNotEmpty()   
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsString() 
  lugar_de_nacimiento: string;

  @IsNotEmpty()           
  @IsString()   
  condicion_migratoria: string; // Corregido con el nombre que aparece en la base de datos

  @IsNotEmpty() 
  @IsString()
  Repite_alguna_materia: string;

  @IsNotEmpty()
  @IsString()   
  institucion_de_procedencia: string; // Corregido para aceptar el nombre con acento

  @IsNotEmpty()   
  @IsString()       
  Presenta_alguna_enfermedad: string;

  @IsNotEmpty()  
  @IsString()
  medicamentos_que_debe_tomar: string;

  @IsNotEmpty()    
  @IsString()
  Ruta_de_viaje: string;

  @IsString()
  Presenta_adecuacion: string;

  @IsString()
  tipo_de_adecuacion: string;

  @IsString()
  recibe_religion: string;

  @IsString()
  presenta_carta: string;

}
