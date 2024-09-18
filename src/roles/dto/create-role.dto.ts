import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @MaxLength(100, { message: 'El nombre del rol no puede superar los 100 caracteres' })
  nombre_Rol: string;

}
