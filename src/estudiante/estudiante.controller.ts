import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('seccion/:seccionId/grado/:gradoId')
  async getStudentsBySectionAndGrade(
    @Param('seccionId') seccionId: number,
    @Param('gradoId') gradoId: number,
  ): Promise<Estudiante[]> {
    return this.estudianteService.findStudentsBySectionAndGrade(seccionId, gradoId);
  }

  @Post()
  async createStudent(@Body() data: {
    nombre_Estudiante: string;
    apellido1_Estudiante: string;
    apellido2_Estudiante: string;
    estado_Estudiante?: string;
    seccionId: number;
    gradoId: number;
  }): Promise<Estudiante> {
    return this.estudianteService.createStudent(data);
  }
  
  @Get()
  async findAll(): Promise<Estudiante[]> {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Estudiante> {
    return this.estudianteService.findOne(+id);
  }

  @Get('seccion/:id_Seccion')
  async findEstudiantesBySeccion(@Param('id_Seccion') id_Seccion: number): Promise<Estudiante[]> {
    return this.estudianteService.findBySeccion(id_Seccion);
  }


}
