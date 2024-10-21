// src/estadoEvento/dto/create-estado-evento.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstadoEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
