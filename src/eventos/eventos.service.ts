// src/evento/evento.service.ts

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Eventos } from './entities/eventos.entity';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-eventos.dto';
import { UpdateEventoDto } from './dto/update-eventos.dto';
import { EstadoEvento } from 'src/estado-evento/entities/estado-evento.entity';
import { TipoEvento } from 'src/tipo-evento/entities/tipo-evento.entity';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';
import { DirigidoA } from 'src/dirigido-a/entities/dirigido-a.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

interface FindFilteredOptions {
  fechaDesde?: string;
  fechaHasta?: string;
  horaDesde?: string;
  horaHasta?: string;
  estado?: 'aprobado' | 'rechazado' | 'pendiente';
}

@Injectable()
export class EventosService {

  private readonly logger = new Logger(EventosService.name);

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
   */
  async findAll(): Promise<Eventos[]> {
    return this.eventoRepository.find({
      relations: ['estadoEvento', 'tipoEvento', 'ubicacion', 'dirigidoA'],
    });
  }

  /**
   * Obtener un evento por su ID.
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
   */
  async update(
    id: number,
    updateEventoDto: UpdateEventoDto,
  ): Promise<Eventos> {
    const evento = await this.findOne(id);

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

    if (updateEventoDto.hora_inicio_Evento || updateEventoDto.hora_fin_Evento) {
      const horaInicio = updateEventoDto.hora_inicio_Evento || evento.hora_inicio_Evento;
      const horaFin = updateEventoDto.hora_fin_Evento || evento.hora_fin_Evento;
      this.validateEndTimeAfterStartTime(horaInicio, horaFin);
    }

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
   */
  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
  }

  /**
   * Aprobar un evento cambiando su estado a "Aprobado".
   */
  async approve(id: number): Promise<Eventos> {
    const evento = await this.findOne(id);

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
   */
  async reject(id: number): Promise<Eventos> {
    const evento = await this.findOne(id);

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
   */
  async findFiltered(opciones: FindFilteredOptions): Promise<Eventos[]> {
    const { fechaDesde, fechaHasta, horaDesde, horaHasta, estado } = opciones;

    const query = this.eventoRepository.createQueryBuilder('evento')
      .leftJoinAndSelect('evento.estadoEvento', 'estadoEvento')
      .leftJoinAndSelect('evento.tipoEvento', 'tipoEvento')
      .leftJoinAndSelect('evento.ubicacion', 'ubicacion')
      .leftJoinAndSelect('evento.dirigidoA', 'dirigidoA');

    if (estado) {
      query.andWhere('estadoEvento.nombre = :estado', { estado: capitalize(estado) });
    }

    if (fechaDesde) {
      query.andWhere('evento.fecha_Evento >= :fechaDesde', { fechaDesde });
    }
    if (fechaHasta) {
      query.andWhere('evento.fecha_Evento <= :fechaHasta', { fechaHasta });
    }

    if (horaDesde) {
      query.andWhere('evento.hora_inicio_Evento >= :horaDesde', { horaDesde });
    }
    if (horaHasta) {
      query.andWhere('evento.hora_fin_Evento <= :horaHasta', { horaHasta });
    }

    const eventos = await query.getMany();
    return eventos;
  }

  /**
   * Valida que la hora de fin sea posterior a la hora de inicio.
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

  // --------------------------------------------------------------------
  // Funciones Automáticas con Cron Jobs
  // --------------------------------------------------------------------

  /**
   * Esta función se ejecuta cada hora y realiza las siguientes tareas:
   * 1. Elimina los eventos aprobados que hayan pasado 72 horas después de la fecha del evento.
   * 2. Actualiza los eventos pendientes a "Rechazado" si faltan 48 horas o menos para la realización.
   * 3. Elimina los eventos rechazados que hayan pasado 72 horas después de la fecha del evento.
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleEventAutomation() {
    const now = new Date();
    this.logger.log('Ejecutando tareas automáticas para eventos...');

    // 1. Eliminar eventos aprobados (fecha_Evento < now - 72 horas)
    const approvedCutoff = new Date(now.getTime() - 72 * 60 * 60 * 1000);
    const approvedEvents = await this.eventoRepository.createQueryBuilder('evento')
      .leftJoinAndSelect('evento.estadoEvento', 'estadoEvento')
      .where('estadoEvento.nombre = :aprobado', { aprobado: 'Aprobado' })
      .andWhere('evento.fecha_Evento < :approvedCutoff', { approvedCutoff: approvedCutoff.toISOString() })
      .getMany();

    for (const event of approvedEvents) {
      this.logger.log(`Eliminando evento aprobado ID ${event.id_Evento}`);
      await this.eventoRepository.remove(event);
    }

    // 2. Actualizar eventos pendientes: Si falta 48 horas o menos para la fecha del evento, pasar a "Rechazado"
    const pendingCutoff = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const pendingEvents = await this.eventoRepository.createQueryBuilder('evento')
      .leftJoinAndSelect('evento.estadoEvento', 'estadoEvento')
      .where('estadoEvento.nombre = :pendiente', { pendiente: 'Pendiente' })
      .andWhere('evento.fecha_Evento <= :pendingCutoff', { pendingCutoff: pendingCutoff.toISOString() })
      .getMany();

    const rejectedState = await this.estadoEventoRepository.findOneBy({ nombre: 'Rechazado' });
    for (const event of pendingEvents) {
      this.logger.log(`Actualizando evento pendiente ID ${event.id_Evento} a Rechazado`);
      event.estadoEvento = rejectedState;
      await this.eventoRepository.save(event);
    }

    // 3. Eliminar eventos rechazados (fecha_Evento < now - 72 horas)
    const rejectedCutoff = new Date(now.getTime() - 72 * 60 * 60 * 1000);
    const rejectedEvents = await this.eventoRepository.createQueryBuilder('evento')
      .leftJoinAndSelect('evento.estadoEvento', 'estadoEvento')
      .where('estadoEvento.nombre = :rechazado', { rechazado: 'Rechazado' })
      .andWhere('evento.fecha_Evento < :rejectedCutoff', { rejectedCutoff: rejectedCutoff.toISOString() })
      .getMany();

    for (const event of rejectedEvents) {
      this.logger.log(`Eliminando evento rechazado ID ${event.id_Evento}`);
      await this.eventoRepository.remove(event);
    }

    this.logger.log('Tareas automáticas para eventos completadas.');
  }
}

/**
 * Función para capitalizar la primera letra de una cadena.
 */
function capitalize(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
