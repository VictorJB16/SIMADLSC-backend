import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';
import { CreateJustificacionAusenciaDto } from './dto/create-justificacion_ausencia.dto';
import { UpdateJustificacionAusenciaDto } from './dto/update-justificacion_ausencia.dto';

@Controller('justificacion-ausencia')
export class JustificacionAusenciaController {
  constructor(private readonly justificacionAusenciaService: JustificacionAusenciaService) {}

  @Post()
  create(@Body() createJustificacionAusenciaDto: CreateJustificacionAusenciaDto) {
    return this.justificacionAusenciaService.create(createJustificacionAusenciaDto);
  }

  @Get()
  findAll() {
    return this.justificacionAusenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.justificacionAusenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJustificacionAusenciaDto: UpdateJustificacionAusenciaDto) {
    return this.justificacionAusenciaService.update(+id, updateJustificacionAusenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.justificacionAusenciaService.remove(+id);
  }
}
