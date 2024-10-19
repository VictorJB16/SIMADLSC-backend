import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

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
  async findOne(@Param('id') id: number): Promise<Estudiante> {
    return await this.estudianteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    return await this.estudianteService.update(id, updateEstudianteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.estudianteService.remove(id);
  }
}
