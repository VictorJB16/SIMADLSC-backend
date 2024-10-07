import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { CreateHorarioProfesorDto } from './dto/create-horario-profesor.dto';
import { Horario } from './entities/horario.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth/jwt-auth.guard';

@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  /**
   * Endpoint para crear Horario para Estudiantes
   * Ruta: POST /horarios/estudiante
   * @param createHorarioDto Datos para crear el horario
   * @returns Horario creado
   */

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Horario[]> {
    try {
      return await this.horarioService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @UseGuards(JwtAuthGuard)
   @Get('seccion/:seccionId')
   async findBySeccion(
     @Param('seccionId', ParseIntPipe) seccionId: number
   ): Promise<Horario[]> {
     try {
       return await this.horarioService.findBySeccion(seccionId);
     } catch (error) {
       throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
   
   @UseGuards(JwtAuthGuard)
   @Get('profesor/:profesorId')
   async findByProfesor(
     @Param('profesorId', ParseIntPipe) profesorId: number
   ): Promise<Horario[]> {
     try {
       return await this.horarioService.findByProfesor(profesorId);
     } catch (error) {
       throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
     }
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

  /**
   * Endpoint para crear Horario para Profesores
   * Ruta: POST /horarios/profesor
   * @param createHorarioDto Datos para crear el horario
   * @returns Horario creado
   */

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
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Horario> {
    try {
      return await this.horarioService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

}
