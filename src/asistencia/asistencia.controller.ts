import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UsePipes, ValidationPipe,Query, ParseIntPipe} from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  // Obtener todas las asistencias
  @Get()
  getAllAsistencias() {
    return this.asistenciaService.getAllAsistencias();
  }

  // Buscar asistencia por id_estudiante
  @Get('/:id')
  getAsistenciaById(@Param('id',ParseIntPipe) id_estudiante: number) {
    return this.asistenciaService.getAsistenciaByIdEstudiante(id_estudiante);
  }

  // Crear una nueva asistencia
  @Post()
  @UsePipes(new ValidationPipe())
  createAsistencia(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.createAsistencia(createAsistenciaDto);
  }



  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateAsistencia(
    @Param('id', ParseIntPipe) id_estudiante: number,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto
  ) {
    return this.asistenciaService.updateAsistencia(id_estudiante, updateAsistenciaDto);
  }

   // Eliminar una asistencia por id_estudiante
   @Delete('/:id')
   deleteAsistencia(@Param('id', ParseIntPipe) id_estudiante: number) {
     return this.asistenciaService.deleteAsistencia(id_estudiante);
   }
}
