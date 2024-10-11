// // src/events/events.controller.ts

// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Delete,
//   Patch,
//   Param,
//   Body,
//   UseGuards,
//   ParseIntPipe,
// } from '@nestjs/common';
// import { EventosService } from './eventos.service';
// import { CreateEventoDto } from './dto/create-eventos.dto';
// import { UpdateEventoDto } from './dto/update-eventos.dto';
// import { Eventos } from './entities/eventos.entity';

// @Controller('eventos')

// export class EventosController {
//   constructor(private readonly eventosService: EventosService) {}

//   /**
//    * Obtiene todos los eventos.
//    */
//   @Get()
//   async findAll(): Promise<Eventos[]> {
//     return this.eventosService.findAll();
//   }

//   /**
//    * Obtiene un evento por su ID.
//    * @param id - ID del evento.
//    */
//   @Get(':id')
//   async findOne(@Param('id', ParseIntPipe) id: number): Promise<Eventos> {
//     return this.eventosService.findOne(id);
//   }

//   /**
//    * Crea un nuevo evento.
//    * @param createEventoDto - Datos para crear el evento.
//    */
//   @Post()
//   async create(@Body() createEventoDto: CreateEventoDto): Promise<Eventos> {
//     return this.eventosService.create(createEventoDto);
//   }

//   /**
//    * Actualiza un evento existente.
//    * @param id - ID del evento a actualizar.
//    * @param updateEventoDto - Datos para actualizar el evento.
//    */
//   @Put(':id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateEventoDto: UpdateEventoDto,
//   ): Promise<Eventos> {
//     return this.eventosService.update(id, updateEventoDto);
//   }

//   /**
//    * Elimina un evento por su ID.
//    * @param id - ID del evento a eliminar.
//    */
//   @Delete(':id')
//   async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
//     return this.eventosService.remove(id);
//   }

//   /**
//    * Aprueba un evento.
//    * @param id - ID del evento a aprobar.
//    */
//   @Patch(':id/approve')
//   async approve(@Param('id', ParseIntPipe) id: number): Promise<Eventos> {
//     return this.eventosService.approve(id);
//   }

//   /**
//    * Rechaza un evento.
//    * @param id - ID del evento a rechazar.
//    */
//   @Patch(':id/reject')
//   async reject(@Param('id', ParseIntPipe) id: number): Promise<Eventos> {
//     return this.eventosService.reject(id);
//   }
// }
