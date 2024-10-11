// src/tipoEvento/dto/update-tipo-evento.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEventoDto } from './create-tipo-evento.dto';

export class UpdateTipoEventoDto extends PartialType(CreateTipoEventoDto) {}
