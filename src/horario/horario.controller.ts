
import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseIntPipe, Put, UseGuards, Delete } from '@nestjs/common';



import { HorarioService } from './horario.service';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { CreateHorarioProfesorDto } from './dto/create-horario-profesor.dto';
import { Horario } from './entities/horario.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Get()
  async findAll(): Promise<Horario[]> {
    return this.horarioService.findAll();
  }

  
  
  
  @UseGuards(JwtAuthGuard)
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
  
  
  @UseGuards(JwtAuthGuard)
  @Post('estudiante')
  
  async createHorarioEstudiante(@Body() createHorarioDto: CreateHorarioEstudianteDto): Promise<Horario> {
    try {
      return await this.horarioService.createHorarioEstudiante(createHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
  
 
 @UseGuards(JwtAuthGuard)
 @Post('profesor')
 
 async createHorarioProfesor(@Body() createHorarioDto: CreateHorarioProfesorDto): Promise<Horario> {
   try {
     return await this.horarioService.createHorarioProfesor(createHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    return this.horarioService.findOne(id);
  }
  
  
  
  @UseGuards(JwtAuthGuard)
  @Put('estudiante/:id')
  async updateHorarioEstudiante(@Param('id', ParseIntPipe) id: number,@Body() updateHorarioDto: CreateHorarioEstudianteDto): Promise<Horario> {
    try {
      return await this.horarioService.updateHorarioEstudante(id, updateHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @UseGuards(JwtAuthGuard)
  @Put('profesor/:id')
  async updateHorarioProfesor(@Param('id', ParseIntPipe) id: number,@Body() updateHorarioDto: CreateHorarioProfesorDto): Promise<Horario> {
    try {
      return await this.horarioService.updateHorarioProfesor(id, updateHorarioDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @UseGuards(JwtAuthGuard)
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



