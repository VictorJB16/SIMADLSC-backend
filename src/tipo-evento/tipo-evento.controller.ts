// src/tipoEvento/tipo-evento.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TipoEventoService } from './tipo-evento.service';
  import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
  import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';
  import { TipoEvento } from './entities/tipo-evento.entity';
  
  @Controller('tipos-eventos')
  export class TipoEventoController {
    constructor(private readonly tipoEventoService: TipoEventoService) {}
  
    @Post()
    create(@Body() createTipoEventoDto: CreateTipoEventoDto): Promise<TipoEvento> {
      return this.tipoEventoService.create(createTipoEventoDto);
    }
  
    @Get()
    findAll(): Promise<TipoEvento[]> {
      return this.tipoEventoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<TipoEvento> {
      return this.tipoEventoService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateTipoEventoDto: UpdateTipoEventoDto,
    ): Promise<TipoEvento> {
      return this.tipoEventoService.update(+id, updateTipoEventoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.tipoEventoService.remove(+id);
    }
  }
  