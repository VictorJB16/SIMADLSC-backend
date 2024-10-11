// // src/eventos/eventos.service.ts

// import { Injectable, NotFoundException, Param } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Eventos } from './entities/eventos.entity';
// import { CreateEventoDto } from './dto/create-eventos.dto';
// import { UpdateEventoDto } from './dto/update-eventos.dto';

// @Injectable()
// export class EventosService {
//   constructor(
//     @InjectRepository(Eventos)
//     private eventosRepository: Repository<Eventos>,
//   ) {}

//   /**
//    * Obtiene todos los eventos.
//    */
//   async findAll(): Promise<Eventos[]> {
//     return this.eventosRepository.find();
//   }

//   /**
//    * Obtiene un evento por su ID.
//    * @param id - ID del evento.
//    */
//   async findOne(id: number): Promise<Eventos> {
//     const evento = await this.eventosRepository.findOne({
//       where: { id_Evento: id },  // Corrección aquí
//     });
//     if (!evento) {
//       throw new NotFoundException(`Evento con ID ${id} no encontrado.`);
//     }
//     return evento;
//   }

//   /**
//    * Crea un nuevo evento.
//    * @param createEventoDto - Datos para crear el evento.
//    */
//   async create(createEventoDto: CreateEventoDto): Promise<Eventos> {
//     const evento = this.eventosRepository.create(createEventoDto);
//     return this.eventosRepository.save(evento);
//   }

//   /**
//    * Actualiza un evento existente.
//    * @param id - ID del evento a actualizar.
//    * @param updateEventoDto - Datos para actualizar el evento.
//    */
//   async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Eventos> {
//     const evento = await this.findOne(id);
//     Object.assign(evento, updateEventoDto);
//     return this.eventosRepository.save(evento);
//   }

//   /**
//    * Elimina un evento por su ID.
//    * @param id - ID del evento a eliminar.
//    */
//   async remove(id: number): Promise<void> {
//     const evento = await this.findOne(id);
//     await this.eventosRepository.remove(evento);

    
//   }
//  /**
//    * Aprueba un evento.
//    * @param id - ID del evento a aprobar.
//    */
//  async approve(id: number): Promise<Eventos> {
//   const evento = await this.findOne(id); // Asegúrate de que el método findOne esté definido.
//   evento.id_estado_evento = 1; // Asigna el ID del estado "Aprobado"
//   return this.eventosRepository.save(evento);
// }

//    /**
//    * Rechaza un evento.
//    * @param id - ID del evento a rechazar.
//    */
//    async reject(id: number): Promise<Eventos> {
//     const evento = await this.findOne(id); // Asegúrate de que el método findOne esté definido.
//     evento.id_estado_evento = 2; // Asigna el ID del estado "Rechazado"
//     return this.eventosRepository.save(evento);
//   }
// }
