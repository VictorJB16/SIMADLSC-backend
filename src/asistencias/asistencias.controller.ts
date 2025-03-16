import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
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

  @Get('periodo/:id')
  async findAsistenciasPorPeriodo(
    @Param('id') id: string,
    @Query('fecha') fecha: string,
    @Query('grado') grado: string,
    @Query('materia') materia: string,
    @Query('seccion') seccion: string
  ): Promise<Asistencia[]> {
    return this.asistenciasService.findAsistenciasPorPeriodo(+id, { fecha, grado, materia, seccion });
  }

  @Get('estudiante/:cedula')
  async obtenerAsistenciasPorCedulaConFiltros(
    @Param('cedula') cedula: string,
    @Query('fecha') fecha?: string,
    @Query('id_Materia') id_Materia?: string,
  ) {
    return this.asistenciasService.obtenerAsistenciasPorCedulaConFiltros(cedula, fecha, id_Materia);
  }

  @Get('reporte/:cedula')
  async obtenerReporteAsistencias(
    @Param('cedula') cedula: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('id_Periodo') id_Periodo?: string,
  ) {
    let periodoIdNum: number | undefined;
    if (id_Periodo !== undefined) {
      periodoIdNum = Number(id_Periodo);
      if (isNaN(periodoIdNum)) {
        throw new BadRequestException('El parámetro id_Periodo debe ser un número válido');
      }
    }

    return this.asistenciasService.obtenerReporteAsistencias(
      cedula,
      fechaInicio,
      fechaFin,
      periodoIdNum,
    );
  }

  @Get('reporte-seccion/:id_Seccion')
  async obtenerReporteAsistenciasPorSeccion(
    @Param('id_Seccion', ParseIntPipe) id_Seccion: number,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    return this.asistenciasService.obtenerReporteAsistenciasPorSeccion(
      id_Seccion,
      fechaInicio,
      fechaFin,
    );
  }
}
