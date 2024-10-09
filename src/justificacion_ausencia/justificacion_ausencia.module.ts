import { Module } from '@nestjs/common';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';
import { JustificacionAusenciaController } from './justificacion_ausencia.controller';

@Module({
  controllers: [JustificacionAusenciaController],
  providers: [JustificacionAusenciaService],
})
export class JustificacionAusenciaModule {}
