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

  @Get('fecha/:fecha')
  async findByDate(@Param('fecha') fecha: string): Promise<Asistencia[]> {
    return this.asistenciasService.findByDate(fecha);
  }

  
  @Get('grado/:id_grado')
  async findByGrado(
    @Param('id_grado') id_grado: string,
  ): Promise<Asistencia[]> {
    return this.asistenciasService.findByGrado(+id_grado);
  }

  
  @Get('materia/:id_Materia')
  async findByMateria(
    @Param('id_Materia') id_Materia: string,
  ): Promise<Asistencia[]> {
    return this.asistenciasService.findByMateria(+id_Materia);
  }

  
  @Get('seccion/:id_Seccion')
  async findBySeccion(
    @Param('id_Seccion') id_Seccion: string,
  ): Promise<Asistencia[]> {
    return this.asistenciasService.findBySeccion(+id_Seccion);
  }
  

  @Patch(':id')
  async actualizarAsistencia(
    @Param('id') id: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<Asistencia> {
    return this.asistenciasService.actualizarAsistencia(+id, updateAsistenciaDto);
  }

  
}
