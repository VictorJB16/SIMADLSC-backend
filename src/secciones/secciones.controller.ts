import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
