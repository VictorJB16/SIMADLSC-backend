// src/ubicacion/ubicacion.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UbicacionService } from './ubicacion.service';
  import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
  import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
  import { Ubicacion } from './entities/ubicacion.entity';
  
  @Controller('ubicaciones')
  export class UbicacionController {
    constructor(private readonly ubicacionService: UbicacionService) {}
  
    @Post()
    create(@Body() createUbicacionDto: CreateUbicacionDto): Promise<Ubicacion> {
      return this.ubicacionService.create(createUbicacionDto);
    }
  
    @Get()
    findAll(): Promise<Ubicacion[]> {
      return this.ubicacionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Ubicacion> {
      return this.ubicacionService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateUbicacionDto: UpdateUbicacionDto,
    ): Promise<Ubicacion> {
      return this.ubicacionService.update(+id, updateUbicacionDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.ubicacionService.remove(+id);
    }
  }
  