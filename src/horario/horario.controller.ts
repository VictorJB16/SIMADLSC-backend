import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseIntPipe,Delete } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { CreateHorarioProfesorDto } from './dto/create-horario-profesor.dto';
import { Horario } from './entities/horario.entity';

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
  async createEstudiante(
    @Body() createHorarioDto: CreateHorarioEstudianteDto
  ): Promise<Horario> {
    return this.horarioService.createHorarioEstudiante(createHorarioDto);
  }

  @Post('profesor')
  async createProfesor(
    @Body() createHorarioDto: CreateHorarioProfesorDto
  ): Promise<Horario> {
    return this.horarioService.createHorarioProfesor(createHorarioDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    return this.horarioService.findOne(id);
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
}



