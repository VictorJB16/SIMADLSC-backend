import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post()
  async crearAsistencia(@Body() createAsistenciaDtoArray: CreateAsistenciaDto[]): Promise<Asistencia[]> {
    return this.asistenciasService.crearAsistencia(createAsistenciaDtoArray);
  }

  @Get()
  findAll() {
    return this.asistenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciasService.findById(+id);
  
  }


  @Delete(':id')
  async deleteAsistencia(@Param('id') id: string): Promise<void> {
    return this.asistenciasService.eliminarAsistencia(+id);
  }
}
