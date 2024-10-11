import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { EstadoEventoService } from './estado-evento.service';
  import { CreateEstadoEventoDto } from './dto/create-estado-evento.dto';
  import { UpdateEstadoEventoDto } from './dto/update-estado-evento.dto';
  import { EstadoEvento } from './entities/estado-evento.entity';
  
  @Controller('estado-eventos')
  export class EstadoEventoController {
    constructor(private readonly estadoEventoService: EstadoEventoService) {}
  
    @Post()
    create(@Body() createEstadoEventoDto: CreateEstadoEventoDto): Promise<EstadoEvento> {
      return this.estadoEventoService.create(createEstadoEventoDto);
    }
  
    @Get()
    findAll(): Promise<EstadoEvento[]> {
      return this.estadoEventoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<EstadoEvento> {
      return this.estadoEventoService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateEstadoEventoDto: UpdateEstadoEventoDto,
    ): Promise<EstadoEvento> {
      return this.estadoEventoService.update(+id, updateEstadoEventoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.estadoEventoService.remove(+id);
    }
  }
  