import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseIntPipe, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { Horario } from './entities/horario.entity';
import { UpdateHorarioEstudianteDto } from './dto/update-horario-estudiante.dto';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  // Obtener todos los horarios
  @Get()
  async findAll(): Promise<Horario[]> {
    return this.horarioService.findAll();
  }

  // Obtener horarios por sección
  @Get('seccion/:id_Seccion')
  async findBySeccion(@Param('id_Seccion', ParseIntPipe) id_Seccion: number): Promise<Horario[]> {
    return this.horarioService.findBySeccion(id_Seccion);
  }

  // Obtener horarios por profesor
  @Get('profesor/:profesorId')
  async findByProfesor(@Param('profesorId', ParseIntPipe) profesorId: number): Promise<Horario[]> {
    return this.horarioService.findByProfesor(profesorId);
  }

  // Crear un nuevo horario de estudiante
  @Post('estudiante')
  @UsePipes(new ValidationPipe({ transform: true })) // Validación y transformación de DTO
  async createHorarioEstudiante(@Body() createHorarioDto: CreateHorarioEstudianteDto): Promise<Horario> {
    try {
      return await this.horarioService.createHorarioEstudiante(createHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener un horario específico por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    return this.horarioService.findOne(id);
  }

  // Actualizar un horario de estudiante
  @Put('estudiante/:id')
  @UsePipes(new ValidationPipe({ transform: true })) // Validación y transformación de DTO
  async updateHorarioEstudiante(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioEstudianteDto
  ): Promise<Horario> {
    try {
      return await this.horarioService.updateHorarioEstudante(id, updateHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Eliminar un horario específico por ID
  @Delete(':id_Horario')
  async eliminarHorario(@Param('id_Horario', ParseIntPipe) id_Horario: number): Promise<void> {
    const resultado = await this.horarioService.eliminarHorario(id_Horario);
    if (!resultado) {
      throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
 @Delete()
  async deleteAll(): Promise<{ deleted: boolean }> {
    try {
      await this.horarioService.deleteAllHorarios();
      return { deleted: true };
    } catch (err) {
      throw new HttpException(
        'Error al eliminar todos los horarios',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
