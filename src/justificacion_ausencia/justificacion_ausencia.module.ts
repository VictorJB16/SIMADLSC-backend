import { Module } from '@nestjs/common';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';
import { JustificacionAusenciaController } from './justificacion_ausencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JustificacionAusencia } from './entities/justificacion_ausencia.entity';
import { Asistencia } from 'src/asistencias/entities/asistencia.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature( [JustificacionAusencia, Asistencia])
  ],
  controllers: [JustificacionAusenciaController],
  providers: [JustificacionAusenciaService],
})
export class JustificacionAusenciaModule {}
