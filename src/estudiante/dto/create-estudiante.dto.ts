
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { tipoadecuacion } from '../entities/tipo-adecuacion.enum';
import { Type } from 'class-transformer';
import { CreateEncargadoLegalDto } from 'src/encargado-legal/dto/create-encargado-legal.dto';

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
  condicion_migratoria: string; 

  @IsNotEmpty() 
  @IsString()
  Repite_alguna_materia: string;

  @IsNotEmpty()
  @IsString()   
  institucion_de_procedencia: string; 

  @IsNotEmpty()   
  @IsString()       
  Presenta_alguna_enfermedad: string;

  @IsNotEmpty()  
  @IsString()
  medicamentos_que_debe_tomar: string;

  @IsNotEmpty()    
  @IsString()
  Ruta_de_viaje: string;

  @IsNotEmpty()
  @IsEnum(tipoadecuacion)
  tipo_de_adecuacion: tipoadecuacion;

  @IsString()
  recibe_religion: string;

  @IsString()
  presenta_carta: string;

  @IsNotEmpty()
  @IsNumber()
  gradoId: number;

  @IsOptional()
  @IsNumber()
  seccionId: number;

  @ValidateNested()
  @Type(() => CreateEncargadoLegalDto)
  encargadoLegal: CreateEncargadoLegalDto;
}