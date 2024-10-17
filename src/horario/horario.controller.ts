
import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseIntPipe, Put, UseGuards, Delete } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { Horario } from './entities/horario.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';
import { UpdateHorarioEstudianteDto } from './dto/update-horario-estudiante.dto';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get()
  async findAll(): Promise<Horario[]> {
    return this.horarioService.findAll();
  }

  @Get('seccion/:seccionId')
  async findBySeccion(
    @Param('seccionId', ParseIntPipe) seccionId: number
  ): Promise<Horario[]> {
    return this.horarioService.findBySeccion(seccionId);
  }

  @Get('profesor/:profesorId')
  async findByProfesor(
    @Param('profesorId', ParseIntPipe) profesorId: number
  ): Promise<Horario[]> {
    return this.horarioService.findByProfesor(profesorId);
  }

  @Post('estudiante')

  async createHorarioEstudiante(@Body() createHorarioDto: CreateHorarioEstudianteDto): Promise<Horario> {
    try {
      return await this.horarioService.createHorarioEstudiante(createHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    return this.horarioService.findOne(id);
  }


  @Put('estudiante/:id')
  async updateHorarioEstudiante(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioEstudianteDto
  ): Promise<Horario> {
    // Llama al servicio para convertir horas y luego actualizar el horario
    return await this.horarioService.updateHorarioEstudante(id, updateHorarioDto);
  }
  
  @Delete(':id_Horario')
  async eliminarHorario(
    @Param('id_Horario', ParseIntPipe) id_Horario: number
  ): Promise<void> {
    const resultado = await this.horarioService.eliminarHorario(id_Horario);

    if (!resultado) {
      throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get('profesor/:id')
  async getHorarioProfesor(@Param('id') id: number) {
    return await this.horarioService.getHorarioByProfesorId(id);

  }

}

