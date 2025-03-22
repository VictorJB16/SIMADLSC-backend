import { IsEmail, isNotEmpty, IsNotEmpty, MaxLength, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre_Usuario: string;


  @IsNotEmpty({ message: 'El primer apellido no puede estar vacío' })
  @MaxLength(100, { message: 'El primer apellido no puede exceder 100 caracteres' })
  apellido1_Usuario: string;

  @MaxLength(100, { message: 'El segundo apellido no puede exceder 100 caracteres' })
  apellido2_Usuario: string; 

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email_Usuario: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contraseña_Usuario: string;

  @IsNotEmpty({ message: 'Debe seleccionar un rol' })
  rol_Usuario: number;  
 
  @IsOptional()
  @IsArray()
  id_Materia?: number[];  // <- NUEVO CAMPO

}
