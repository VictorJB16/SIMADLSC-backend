// src/evento/evento.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-eventos.dto';
import { UpdateEventoDto } from './dto/update-eventos.dto';
import { Eventos } from './entities/eventos.entity';
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventoService: EventosService) {}

  /**
   * Crear un nuevo evento.
   * @param createEventoDto DTO para crear un evento.
   * @returns El evento creado.
   */
  @Post()
  create(@Body() createEventoDto: CreateEventoDto): Promise<Eventos> {
    return this.eventoService.create(createEventoDto);
  }

  /**
   * Obtener todos los eventos.
   * @returns Una lista de eventos.
   */
  @Get()
  findAll(): Promise<Eventos[]> {
    return this.eventoService.findAll();
  }

  
  /**
   * Obtener un evento por su ID.
   * @param id ID del evento.
   * @returns El evento encontrado.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Eventos> {
    return this.eventoService.findOne(+id);
  }

  /**
   * Actualizar un evento existente.
   * @param id ID del evento a actualizar.
   * @param updateEventoDto DTO con los datos a actualizar.
   * @returns El evento actualizado.
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventoDto: UpdateEventoDto,
  ): Promise<Eventos> {
    return this.eventoService.update(+id, updateEventoDto);
  }

  /**
   * Eliminar un evento por su ID.
   * @param id ID del evento a eliminar.
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventoService.remove(+id);
  }

  /**
   * Aprobar un evento.
   * @param id ID del evento a aprobar.
   * @returns El evento actualizado.
   */
  @Post(':id/approve')
  approve(@Param('id') id: string): Promise<Eventos> {
    return this.eventoService.approve(+id);
  }

  /**
   * Rechazar un evento.
   * @param id ID del evento a rechazar.
   * @returns El evento actualizado.
   */
  @Post(':id/reject')
  reject(@Param('id') id: string): Promise<Eventos> {
    return this.eventoService.reject(+id);
  }
}
