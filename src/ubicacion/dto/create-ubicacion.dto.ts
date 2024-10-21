// src/ubicacion/dto/create-ubicacion.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
