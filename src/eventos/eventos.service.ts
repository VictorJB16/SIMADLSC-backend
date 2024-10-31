// src/evento/evento.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Eventos } from './entities/eventos.entity';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-eventos.dto';
import { UpdateEventoDto } from './dto/update-eventos.dto';
import { EstadoEvento } from 'src/estado-evento/entities/estado-evento.entity';
import { TipoEvento } from 'src/tipo-evento/entities/tipo-evento.entity';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';
import { DirigidoA } from 'src/dirigido-a/entities/dirigido-a.entity';

interface FindFilteredOptions {
  fechaDesde?: string;
  fechaHasta?: string;
  horaDesde?: string;
  horaHasta?: string;
  estado?: 'aprobado' | 'rechazado' | 'pendiente';
}

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Eventos)
    private readonly eventoRepository: Repository<Eventos>,

    @InjectRepository(EstadoEvento)
    private readonly estadoEventoRepository: Repository<EstadoEvento>,

    @InjectRepository(TipoEvento)
    private readonly tipoEventoRepository: Repository<TipoEvento>,

    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,

    @InjectRepository(DirigidoA)
    private readonly dirigidoARepository: Repository<DirigidoA>,
  ) {}

  /**
   * Crear un nuevo evento.
   * @param createEventoDto DTO para crear un evento.
   * @returns El evento creado.
   */
  async create(createEventoDto: CreateEventoDto): Promise<Eventos> {
    const evento = new Eventos();
    evento.nombre_Evento = createEventoDto.nombre_Evento;
    evento.descripcion_Evento = createEventoDto.descripcion_Evento;
    evento.fecha_Evento = createEventoDto.fecha_Evento;
    evento.hora_inicio_Evento = createEventoDto.hora_inicio_Evento;
    evento.hora_fin_Evento = createEventoDto.hora_fin_Evento;

    // Validar que la hora de fin sea posterior a la hora de inicio
    this.validateEndTimeAfterStartTime(evento.hora_inicio_Evento, evento.hora_fin_Evento);

    // Asignar relaciones
    evento.dirigidoA = await this.dirigidoARepository.findOneBy({
      id: createEventoDto.id_dirigido_a,
    });
    evento.estadoEvento = await this.estadoEventoRepository.findOneBy({
      id: createEventoDto.id_estado_evento,
    });
    evento.tipoEvento = await this.tipoEventoRepository.findOneBy({
      id: createEventoDto.id_tipo_evento,
    });
    evento.ubicacion = await this.ubicacionRepository.findOneBy({
      id: createEventoDto.id_ubicacion,
    });

    // Validar que todas las relaciones existan
    if (
      !evento.dirigidoA ||
      !evento.estadoEvento ||
      !evento.tipoEvento ||
      !evento.ubicacion
    ) {
      throw new NotFoundException(
        'Una o más entidades relacionadas no fueron encontradas.',
      );
    }

    return this.eventoRepository.save(evento);
  }

  /**
   * Obtener todos los eventos.
   * @returns Una lista de eventos.
   */
  async findAll(): Promise<Eventos[]> {
    return this.eventoRepository.find({
      relations: ['estadoEvento', 'tipoEvento', 'ubicacion', 'dirigidoA'],
    });
  }

  /**
   * Obtener un evento por su ID.
   * @param id ID del evento.
   * @returns El evento encontrado.
   */
  async findOne(id: number): Promise<Eventos> {
    const evento = await this.eventoRepository.findOne({
      where: { id_Evento: id },
      relations: ['estadoEvento', 'tipoEvento', 'ubicacion', 'dirigidoA'],
    });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  /**
   * Actualizar un evento existente.
   * @param id ID del evento a actualizar.
   * @param updateEventoDto DTO con los datos a actualizar.
   * @returns El evento actualizado.
   */
  async update(
    id: number,
    updateEventoDto: UpdateEventoDto,
  ): Promise<Eventos> {
    const evento = await this.findOne(id);

    // Actualizar propiedades básicas
    if (updateEventoDto.nombre_Evento)
      evento.nombre_Evento = updateEventoDto.nombre_Evento;
    if (updateEventoDto.descripcion_Evento)
      evento.descripcion_Evento = updateEventoDto.descripcion_Evento;
    if (updateEventoDto.fecha_Evento)
      evento.fecha_Evento = updateEventoDto.fecha_Evento;
    if (updateEventoDto.hora_inicio_Evento)
      evento.hora_inicio_Evento = updateEventoDto.hora_inicio_Evento;
    if (updateEventoDto.hora_fin_Evento)
      evento.hora_fin_Evento = updateEventoDto.hora_fin_Evento;

    // Validar que la hora de fin sea posterior a la hora de inicio si se actualizan las horas
    if (updateEventoDto.hora_inicio_Evento || updateEventoDto.hora_fin_Evento) {
      const horaInicio = updateEventoDto.hora_inicio_Evento || evento.hora_inicio_Evento;
      const horaFin = updateEventoDto.hora_fin_Evento || evento.hora_fin_Evento;

      this.validateEndTimeAfterStartTime(horaInicio, horaFin);
    }

    // Actualizar relaciones si se proporcionan
    if (updateEventoDto.id_dirigido_a) {
      evento.dirigidoA = await this.dirigidoARepository.findOneBy({
        id: updateEventoDto.id_dirigido_a,
      });
      if (!evento.dirigidoA) {
        throw new NotFoundException(
          `DirigidoA con ID ${updateEventoDto.id_dirigido_a} no encontrado`,
        );
      }
    }

    if (updateEventoDto.id_estado_evento) {
      evento.estadoEvento = await this.estadoEventoRepository.findOneBy({
        id: updateEventoDto.id_estado_evento,
      });
      if (!evento.estadoEvento) {
        throw new NotFoundException(
          `EstadoEvento con ID ${updateEventoDto.id_estado_evento} no encontrado`,
        );
      }
    }

    if (updateEventoDto.id_tipo_evento) {
      evento.tipoEvento = await this.tipoEventoRepository.findOneBy({
        id: updateEventoDto.id_tipo_evento,
      });
      if (!evento.tipoEvento) {
        throw new NotFoundException(
          `TipoEvento con ID ${updateEventoDto.id_tipo_evento} no encontrado`,
        );
      }
    }

    if (updateEventoDto.id_ubicacion) {
      evento.ubicacion = await this.ubicacionRepository.findOneBy({
        id: updateEventoDto.id_ubicacion,
      });
      if (!evento.ubicacion) {
        throw new NotFoundException(
          `Ubicacion con ID ${updateEventoDto.id_ubicacion} no encontrado`,
        );
      }
    }

    return this.eventoRepository.save(evento);
  }

  /**
   * Eliminar un evento por su ID.
   * @param id ID del evento a eliminar.
   */
  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
  }

  /**
   * Aprobar un evento cambiando su estado a "Aprobado".
   * @param id ID del evento a aprobar.
   * @returns El evento actualizado.
   */
  async approve(id: number): Promise<Eventos> {
    const evento = await this.findOne(id);

    // Buscar el estado "Aprobado"
    const aprobadoEstado = await this.estadoEventoRepository.findOneBy({
      nombre: 'Aprobado',
    });
    if (!aprobadoEstado) {
      throw new NotFoundException(
        'Estado "Aprobado" no encontrado en EstadoEvento',
      );
    }

    evento.estadoEvento = aprobadoEstado;
    return this.eventoRepository.save(evento);
  }

  /**
   * Rechazar un evento cambiando su estado a "Rechazado".
   * @param id ID del evento a rechazar.
   * @returns El evento actualizado.
   */
  async reject(id: number): Promise<Eventos> {
    const evento = await this.findOne(id);

    // Buscar el estado "Rechazado"
    const rechazadoEstado = await this.estadoEventoRepository.findOneBy({
      nombre: 'Rechazado',
    });
    if (!rechazadoEstado) {
      throw new NotFoundException(
        'Estado "Rechazado" no encontrado en EstadoEvento',
      );
    }

    evento.estadoEvento = rechazadoEstado;
    return this.eventoRepository.save(evento);
  }

  /**
   * Obtiene la lista de eventos filtrados por fecha, hora y estado.
   * @param opciones - Opciones de filtrado.
   * @returns Una lista de eventos que coinciden con los filtros.
   */
  async findFiltered(opciones: FindFilteredOptions): Promise<Eventos[]> {
    const { fechaDesde, fechaHasta, horaDesde, horaHasta, estado } = opciones;

    // Crear el QueryBuilder para construir la consulta dinámicamente
    const query = this.eventoRepository.createQueryBuilder('evento')
      .leftJoinAndSelect('evento.estadoEvento', 'estadoEvento')
      .leftJoinAndSelect('evento.tipoEvento', 'tipoEvento')
      .leftJoinAndSelect('evento.ubicacion', 'ubicacion')
      .leftJoinAndSelect('evento.dirigidoA', 'dirigidoA');

    // Filtrar por estado si se proporciona
    if (estado) {
      query.andWhere('estadoEvento.nombre = :estado', { estado: capitalize(estado) });
    }

    // Filtrar por fecha
    if (fechaDesde) {
      query.andWhere('evento.fecha_Evento >= :fechaDesde', { fechaDesde });
    }
    if (fechaHasta) {
      query.andWhere('evento.fecha_Evento <= :fechaHasta', { fechaHasta });
    }

    // Filtrar por hora
    if (horaDesde) {
      query.andWhere('evento.hora_inicio_Evento >= :horaDesde', { horaDesde });
    }
    if (horaHasta) {
      query.andWhere('evento.hora_fin_Evento <= :horaHasta', { horaHasta });
    }

    // Ejecutar la consulta
    const eventos = await query.getMany();

    return eventos;
  }

  /**
   * Valida que la hora de fin sea posterior a la hora de inicio.
   * @param horaInicio - Hora de inicio en formato 'HH:MM'.
   * @param horaFin - Hora de fin en formato 'HH:MM'.
   */
  private validateEndTimeAfterStartTime(horaInicio: string, horaFin: string): void {
    const [horaInicioNum, minutoInicio] = horaInicio.split(':').map(Number);
    const [horaFinNum, minutoFin] = horaFin.split(':').map(Number);

    const startTime = new Date();
    startTime.setHours(horaInicioNum, minutoInicio, 0, 0);

    const endTime = new Date();
    endTime.setHours(horaFinNum, minutoFin, 0, 0);

    if (endTime <= startTime) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la hora de inicio.',
      );
    }
  }
}

/**
 * Función para capitalizar la primera letra de una cadena.
 * Por ejemplo, 'aprobado' -> 'Aprobado'
 * @param texto - Texto a capitalizar.
 * @returns Texto capitalizado.
 */
function capitalize(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
