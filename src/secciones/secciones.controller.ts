import { Controller, Get, Post, Body, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { Seccion } from './entities/seccion.entity';
@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  @Get()
  async findAll(@Query('gradoId') gradoId?: string): Promise<Seccion[]> {
    if (gradoId) {
      const id = parseInt(gradoId, 10);
      return this.seccionesService.findByGrado(id);
    } else {
      return this.seccionesService.findAll();
    }
  }
  
  @Post()
  async create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionesService.create(createSeccionDto);
  }
  
    @Get(':id')
    async findOne(@Param( 'id', ParseIntPipe) id: number) {
      if(!id) {
        throw new NotFoundException('Seccion no encontrada');
      }
      return this.seccionesService.findOne(id);
    }

    @Get('grado/:id_grado')
  async findByGrado(@Param('id_grado') id_grado: string): Promise<Seccion[]> {
    const idGradoNumber = parseInt(id_grado, 10);
    return this.seccionesService.findByGrado(idGradoNumber);
  }

}
