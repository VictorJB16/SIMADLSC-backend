import { IsBoolean, IsString } from 'class-validator';

export class JustificarAsistenciaDto {
  @IsBoolean()
  justificado: boolean;

  @IsString()
  motivo_justificacion: string;
}
