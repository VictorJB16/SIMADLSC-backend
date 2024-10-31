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

  @Get('reporte')
  async obtenerReporteAsistencias(@Query() queryParams) {
    const {
      cedula,
      gradoId,
      seccionId,
      periodoId,
      fechaInicio,
      fechaFin,
    } = queryParams;

    // Validar y preparar los filtros
    const filtros: any = {};

    if (cedula) {
      filtros.cedula = cedula;
    }

    if (gradoId !== undefined) {
      const gradoIdNum = Number(gradoId);
      if (isNaN(gradoIdNum)) {
        throw new BadRequestException('El parámetro gradoId debe ser un número válido');
      }
      filtros.gradoId = gradoIdNum;
    }

    if (seccionId !== undefined) {
      const seccionIdNum = Number(seccionId);
      if (isNaN(seccionIdNum)) {
        throw new BadRequestException('El parámetro seccionId debe ser un número válido');
      }
      filtros.seccionId = seccionIdNum;
    }

    if (periodoId !== undefined) {
      const periodoIdNum = Number(periodoId);
      if (isNaN(periodoIdNum)) {
        throw new BadRequestException('El parámetro periodoId debe ser un número válido');
      }
      filtros.periodoId = periodoIdNum;
    }

    if (fechaInicio) {
      // Opcional: Validar formato de fecha
      filtros.fechaInicio = fechaInicio;
    }

    if (fechaFin) {
      // Opcional: Validar formato de fecha
      filtros.fechaFin = fechaFin;
    }

    if (!cedula && !gradoId && !seccionId && !periodoId && !fechaInicio && !fechaFin) {
      throw new BadRequestException('Debe proporcionar al menos un filtro para realizar la búsqueda');
    }

    return this.asistenciasService.obtenerReporteAsistencias(filtros);
  }

}

