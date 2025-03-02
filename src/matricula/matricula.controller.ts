import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './Dto/create-matricula.dto';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { UpdateMatriculaDto } from './Dto/update-matricula.dto';
import { AssignSeccionDto } from './Dto/assign-seccion.dto';

@Controller('matriculas')
export class MatriculaController {

  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  async create(@Body() createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    return this.matriculaService.create(createMatriculaDto);
  }

  @Get()
  async getAllMatriculas(): Promise<Matricula[]> {
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


 @Put(':id')
  async updateMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMatriculaDto: UpdateMatriculaDto,
  ): Promise<Matricula> {
    // Llamada al servicio para actualizar la matrícula
    const updatedMatricula = await this.matriculaService.updateMatricula(id, updateMatriculaDto);
    if (!updatedMatricula) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }
    return updatedMatricula;
  }

  @Patch('estado/:id')
  async updateEstadoMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { nuevoEstado: string }
  ): Promise<Matricula> {
    return await this.matriculaService.updateEstadoMatricula(id, body.nuevoEstado);
  }  

  //! Método para asignar una sección a una o más matrículas
  @Post('asignar-seccion')
  async assignSeccion(
    @Body() dto: AssignSeccionDto,
  ): Promise<Matricula[]> {
    return this.matriculaService.assignSeccionToMatriculas(dto);
  }


}
