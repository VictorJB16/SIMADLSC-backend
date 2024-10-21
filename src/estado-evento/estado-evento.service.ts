// src/estadoEvento/estado-evento.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoEvento } from './entities/estado-evento.entity';
import { Repository } from 'typeorm';
import { CreateEstadoEventoDto } from './dto/create-estado-evento.dto';
import { UpdateEstadoEventoDto } from './dto/update-estado-evento.dto';

@Injectable()
export class EstadoEventoService {
  constructor(
    @InjectRepository(EstadoEvento)
    private readonly estadoEventoRepository: Repository<EstadoEvento>,
  ) {}

  async create(
    createEstadoEventoDto: CreateEstadoEventoDto,
  ): Promise<EstadoEvento> {
    const estadoEvento = this.estadoEventoRepository.create(createEstadoEventoDto);
    return this.estadoEventoRepository.save(estadoEvento);
  }

  async findAll(): Promise<EstadoEvento[]> {
    return this.estadoEventoRepository.find();
  }

  async findOne(id: number): Promise<EstadoEvento> {
    const estadoEvento = await this.estadoEventoRepository.findOne({
      where: { id },
    });
    if (!estadoEvento) {
      throw new NotFoundException(`EstadoEvento con ID ${id} no encontrado`);
    }
    return estadoEvento;
  }

  async update(
    id: number,
    updateEstadoEventoDto: UpdateEstadoEventoDto,
  ): Promise<EstadoEvento> {
    const estadoEvento = await this.findOne(id);
    Object.assign(estadoEvento, updateEstadoEventoDto);
    return this.estadoEventoRepository.save(estadoEvento);
  }

  async remove(id: number): Promise<void> {
    const estadoEvento = await this.findOne(id);
    await this.estadoEventoRepository.remove(estadoEvento);
  }
}
