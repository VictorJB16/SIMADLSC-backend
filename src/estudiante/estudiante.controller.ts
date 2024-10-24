import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { Horario } from 'src/horario/entities/horario.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Estudiante> {
    return this.estudianteService.findOne(+id); // Llama al servicio para obtener el estudiante
  }

  @Get(':id/horarios')
  async obtenerHorariosPorEstudiante(@Param('id') id: string): Promise<Horario[]> {
    return this.estudianteService.obtenerHorariosPorEstudiante(+id);
  }










  

  @Get('seccion/:id')
  async obtenerEstudiantesPorSeccion(@Param('id') id: string): Promise<Estudiante[]> {
    return this.estudianteService.obtenerEstudiantesPorSeccion(+id);
  }
  
}