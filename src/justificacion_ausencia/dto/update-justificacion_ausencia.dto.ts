import { PartialType } from '@nestjs/mapped-types';
import { CreateJustificacionAusenciaDto } from './create-justificacion_ausencia.dto';

export class UpdateJustificacionAusenciaDto extends PartialType(CreateJustificacionAusenciaDto) {}
