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
   * - Si recibe alguno de los filtros (nombre, apellido, cedula, seccion, nivel), llama a findByFilters(query).
   * - De lo contrario, llama a findAll() y retorna todos.
   */
  @Get()
  async findAll(@Query() query: any): Promise<Estudiante[]> {
    // Ejemplo de ver qué llega en la query
    if (query.nombre || query.apellido || query.cedula || query.seccion || query.nivel) {
      return this.estudianteService.findByFilters(query);
    }
    // (Opcional) Si quisieras una búsqueda simple por "search" en lugar de filtrar:
    // if (query.search && query.search.trim() !== '') {
    //   return this.estudianteService.getEstudiantes(query.search);
    // }

    // Caso por defecto: sin filtros ni search
    return this.estudianteService.findAll();
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

  @Get('seccion/:id')
  async obtenerEstudiantesPorSeccion(@Param('id') id: string): Promise<Estudiante[]> {
    return this.estudianteService.obtenerEstudiantesPorSeccion(+id);
  }
}
