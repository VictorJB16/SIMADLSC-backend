import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query, // Asegúrate de importar Query
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async create(@Body() createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    return await this.estudianteService.create(createEstudianteDto);
  }

  /**
   * GET /estudiantes
   * Si se envían filtros (nombre, apellido, cedula, seccion, nivel), se llama a findByFilters.
   * Caso contrario, se llama a findAll.
   */
  @Get()
  async findAll(@Query() query: any): Promise<Estudiante[]> {
    if (query.nombre || query.apellido || query.cedula || query.seccion || query.nivel) {
      return this.estudianteService.findByFilters(query);
    }
    return this.estudianteService.findAll();
  }

  // Endpoint para obtener solo los estudiantes de una sección específica
  @Get('seccion/:id')
  async obtenerEstudiantesPorSeccion(@Param('id') id: string): Promise<Estudiante[]> {
    return this.estudianteService.findStudentsWithSectionById(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Estudiante> {
    return this.estudianteService.findOne(+id);
  }

  @Get(':id/horarios')
  async obtenerHorariosPorEstudiante(@Param('id') id: string): Promise<Horario[]> {
    return this.estudianteService.obtenerHorariosPorEstudiante(+id);
  }

  @Post('matricula')
  async creates(@Body() createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    return await this.estudianteService.createEstudiante(createEstudianteDto);
  }
}