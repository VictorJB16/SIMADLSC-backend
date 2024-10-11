import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grado } from './entities/grados-entity';
import { CreateGradoDto } from './dto/create-grados.dto';

@Injectable()
export class GradosService {
  constructor(
    @InjectRepository(Grado)
    private gradoRepository: Repository<Grado>,
  ) {}

  async findAll(): Promise<Grado[]> {
    return this.gradoRepository.find();
  }

  async create(createGradoDto: CreateGradoDto): Promise<Grado> {
    const grado = this.gradoRepository.create(createGradoDto);
    return this.gradoRepository.save(grado);
  }
}