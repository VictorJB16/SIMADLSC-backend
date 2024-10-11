import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEventoDto } from './create-estado-evento.dto';

export class UpdateEstadoEventoDto extends PartialType(CreateEstadoEventoDto) {}
