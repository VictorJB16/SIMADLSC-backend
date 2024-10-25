import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
//import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';

@Controller('matriculas')
export class MatriculaController {

  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  async create(@Body() createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    return this.matriculaService.create(createMatriculaDto);
  }

  @Get()
  async findAll(): Promise<Matricula[]> {
    return this.matriculaService.findAll();
  }


 // Nuevo método para obtener los datos del Encargado Legal y del Estudiante por matrícula ID
 @Get(':id/encargado-estudiante')
 async findEncargadoAndEstudiante(@Param('id', ParseIntPipe) id: number): Promise<{ estudiante: Estudiante; encargadoLegal: EncargadoLegal }> {
   return this.matriculaService.findEncargadoAndEstudianteByMatriculaId(id);
 }

 // Nuevo método para eliminar una matrícula por su ID
 @Delete(':id')
 @HttpCode(HttpStatus.NO_CONTENT)
 async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
   return this.matriculaService.remove(id);
 }




}