import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirigidoA } from './entities/dirigido-a.entity';
import { CreateDirigidoADto } from './dto/create-dirigido-a.dto';
import { UpdateDirigidoADto } from './dto/update-dirigido-a.dto';

@Injectable()
export class DirigidoAService {
  constructor(
    @InjectRepository(DirigidoA)
    private readonly dirigidoARepository: Repository<DirigidoA>,
  ) {}

  async create(createDirigidoADto: CreateDirigidoADto): Promise<DirigidoA> {
    const dirigidoA = this.dirigidoARepository.create(createDirigidoADto);
    return this.dirigidoARepository.save(dirigidoA);
  }

  async findAll(): Promise<DirigidoA[]> {
    return this.dirigidoARepository.find();
  }

  async findOne(id: number): Promise<DirigidoA> {
    const dirigidoA = await this.dirigidoARepository.findOneBy({ id });
    if (!dirigidoA) {
      throw new NotFoundException(`DirigidoA con ID ${id} no encontrado`);
    }
    return dirigidoA;
  }
  
  async update(
    id: number,
    updateDirigidoADto: UpdateDirigidoADto,
  ): Promise<DirigidoA> {
    const dirigidoA = await this.findOne(id);
    Object.assign(dirigidoA, updateDirigidoADto);
    return this.dirigidoARepository.save(dirigidoA);
  }

  async remove(id: number): Promise<void> {
    const dirigidoA = await this.findOne(id);
    await this.dirigidoARepository.remove(dirigidoA);
  }
}
