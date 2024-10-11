// src/tipoEvento/dto/create-tipo-evento.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoEventoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;
}
