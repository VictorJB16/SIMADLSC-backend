// src/tipoEvento/tipo-evento.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEvento } from './entities/tipo-evento.entity';
import { Repository } from 'typeorm';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';

@Injectable()
export class TipoEventoService {
  constructor(
    @InjectRepository(TipoEvento)
    private readonly tipoEventoRepository: Repository<TipoEvento>,
  ) {}

  async create(createTipoEventoDto: CreateTipoEventoDto): Promise<TipoEvento> {
    const tipoEvento = this.tipoEventoRepository.create(createTipoEventoDto);
    return this.tipoEventoRepository.save(tipoEvento);
  }

  async findAll(): Promise<TipoEvento[]> {
    return this.tipoEventoRepository.find();
  }

  async findOne(id: number): Promise<TipoEvento> {
    const tipoEvento = await this.tipoEventoRepository.findOne({
      where: { id },
    });
    if (!tipoEvento) {
      throw new NotFoundException(`TipoEvento con ID ${id} no encontrado`);
    }
    return tipoEvento;
  }


  async update(
    id: number,
    updateTipoEventoDto: UpdateTipoEventoDto,
  ): Promise<TipoEvento> {
    const tipoEvento = await this.findOne(id);
    Object.assign(tipoEvento, updateTipoEventoDto);
    return this.tipoEventoRepository.save(tipoEvento);
  }

  async remove(id: number): Promise<void> {
    const tipoEvento = await this.findOne(id);
    await this.tipoEventoRepository.remove(tipoEvento);
  }
}
