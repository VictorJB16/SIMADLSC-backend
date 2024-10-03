import { Controller, Get, Post, Body, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { SeccionesService } from './secciones.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';

@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionesService: SeccionesService) {}

  @Get()
  async findAll() {
    return this.seccionesService.findAll();
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


}
