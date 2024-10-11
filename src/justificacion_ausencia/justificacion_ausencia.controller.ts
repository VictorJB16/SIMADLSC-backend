import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';
import { CreateJustificacionAusenciaDto } from './dto/create-justificacion_ausencia.dto';
import { JustificacionAusencia } from './entities/justificacion_ausencia.entity';

@Controller('justificacion-ausencia')
export class JustificacionAusenciaController {
  constructor(private readonly justificacionAusenciaService: JustificacionAusenciaService) {}


  @Post(':id')
  async justificar(@Param('id') id: string, @Body() createJustificacionDto: CreateJustificacionAusenciaDto): Promise<JustificacionAusencia> {
      return this.justificacionAusenciaService.justificarAsistencia(+id, createJustificacionDto);
  }

  @Get()
  async obtenerJustificaciones(): Promise<JustificacionAusencia[]> {
    return this.justificacionAusenciaService.obtenerJustificaciones();
  }

  
  
}
