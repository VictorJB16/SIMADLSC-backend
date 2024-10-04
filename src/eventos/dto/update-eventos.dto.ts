
import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-eventos.dto';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {}
