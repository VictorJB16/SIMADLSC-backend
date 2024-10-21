import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
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

  @Get()
  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteService.findAll();
  }

 @Get(':id')
  async findOne(@Param('id') id: string): Promise<Estudiante> {
    return this.estudianteService.findOne(+id); // Llama al servicio para obtener el estudiante
  }

  @Get(':id/horarios')
  async obtenerHorariosPorEstudiante(@Param('id') id: string): Promise<Horario[]> {
    return this.estudianteService.obtenerHorariosPorEstudiante(+id);
  }

}

