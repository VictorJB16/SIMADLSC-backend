import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periodo } from './entities/periodo.entity';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Injectable()
export class PeriodoService {
  constructor(
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,
  ) {}

  async findAll(): Promise<Periodo[]> {
    return await this.periodoRepository.find();
  }

  async findOne(id: number): Promise<Periodo> {
    const periodo = await this.periodoRepository.findOne({ where: { id_Periodo: id } });
    if (!periodo) {
      throw new NotFoundException(`El periodo con ID ${id} no fue encontrado`);
    }
    return periodo;
  }

  async create(createPeriodoDto: CreatePeriodoDto): Promise<Periodo> {
    const periodo = this.periodoRepository.create(createPeriodoDto);
    return await this.periodoRepository.save(periodo);
  }

  async update(id: number, updatePeriodoDto: UpdatePeriodoDto): Promise<Periodo> {
    const periodo = await this.findOne(id);
    Object.assign(periodo, updatePeriodoDto);
    return await this.periodoRepository.save(periodo);
  }

  async remove(id: number): Promise<void> {
    const periodo = await this.findOne(id);
    await this.periodoRepository.remove(periodo);
  }
}
