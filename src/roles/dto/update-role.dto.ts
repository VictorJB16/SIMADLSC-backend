import { IsOptional, MaxLength, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre del rol no puede estar vacío si se proporciona' })
  @MaxLength(100, { message: 'El nombre del rol no puede superar los 100 caracteres' })
  nombre_Rol?: string;

}
