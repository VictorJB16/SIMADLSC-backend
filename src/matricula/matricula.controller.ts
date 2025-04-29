// src/matricula/matricula.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Patch,
  Req,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './Dto/create-matricula.dto';
import { UpdateMatriculaDto } from './Dto/update-matricula.dto';
import { AssignSeccionDto } from './Dto/assign-seccion.dto';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';

@Controller('matriculas')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('archivo'))
  async create(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Matricula> {
    const raw = (req.body as any).data;
    if (!raw) {
      throw new BadRequestException('No llegó el campo "data" en el formulario');
    }

    let dto: CreateMatriculaDto;
    try {
      dto = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Formato JSON inválido en el campo "data"');
    }

    try {
      return await this.matriculaService.create(dto, files);
    } catch (err) {
      console.error('Error en MatriculaService.create():', err);
      throw new InternalServerErrorException('No se pudo crear la matrícula');
    }
  }

  @Get()
  async getAllMatriculas(): Promise<Matricula[]> {
    return this.matriculaService.findAll();
  }

  @Get(':id/encargado-estudiante')
  async findEncargadoAndEstudiante(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ estudiante: Estudiante; encargadoLegal: EncargadoLegal }> {
    return this.matriculaService.findEncargadoAndEstudianteByMatriculaId(id);
  }

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
    const updated = await this.matriculaService.updateMatricula(id, updateMatriculaDto);
    if (!updated) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }
    return updated;
  }

  @Patch('estado/:id')
  async updateEstadoMatricula(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { nuevoEstado: string },
  ): Promise<Matricula> {
    return this.matriculaService.updateEstadoMatricula(id, body.nuevoEstado);
  }

  @Post('asignar-seccion')
  async assignSeccion(@Body() dto: AssignSeccionDto): Promise<Matricula[]> {
    return this.matriculaService.assignSeccionToMatriculas(dto);
  }

  @Get('sin-seccion')
  async getMatriculasSinSeccion(): Promise<Matricula[]> {
    return this.matriculaService.findMatriculasSinSeccion();
  }
}
