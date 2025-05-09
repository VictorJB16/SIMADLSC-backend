import { IsOptional, IsEmail, MinLength, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  nombre_Usuario?: string;

  @IsOptional()
  apellido1_Usuario?: string;

  @IsOptional()
  apellido2_Usuario?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email_Usuario?: string;

  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contraseña_Usuario?: string;

  @IsOptional()
  rol_Usuario?: number; // Referencia al ID del Rol
  
   @IsOptional()
  @IsBoolean({ message: 'El valor de bloqueo debe ser verdadero o falso' })
  bloqueado_Usuario?: boolean;
}
