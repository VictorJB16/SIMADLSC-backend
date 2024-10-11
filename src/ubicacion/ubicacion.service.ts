// src/ubicacion/ubicacion.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}

  async create(createUbicacionDto: CreateUbicacionDto): Promise<Ubicacion> {
    const ubicacion = this.ubicacionRepository.create(createUbicacionDto);
    return this.ubicacionRepository.save(ubicacion);
  }

  async findAll(): Promise<Ubicacion[]> {
    return this.ubicacionRepository.find();
  }

  async findOne(id: number): Promise<Ubicacion> {
    const ubicacion = await this.ubicacionRepository.findOne({
      where: { id },
    });
    if (!ubicacion) {
      throw new NotFoundException(`Ubicacion con ID ${id} no encontrado`);
    }
    return ubicacion;
  }

  async update(
    id: number,
    updateUbicacionDto: UpdateUbicacionDto,
  ): Promise<Ubicacion> {
    const ubicacion = await this.findOne(id);
    Object.assign(ubicacion, updateUbicacionDto);
    return this.ubicacionRepository.save(ubicacion);
  }

  async remove(id: number): Promise<void> {
    const ubicacion = await this.findOne(id);
    await this.ubicacionRepository.remove(ubicacion);
  }
}
