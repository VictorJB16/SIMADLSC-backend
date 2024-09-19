import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from './entities/seccion.entity';    
import { CreateSeccionDto } from './dto/create-seccion.dto';

@Injectable()
export class SeccionesService {
  constructor(
    @InjectRepository(Seccion)
    private seccionRepository: Repository<Seccion>,
  ) {}

  async findAll(): Promise<Seccion[]> {
    return this.seccionRepository.find();
  }

  async create(createSeccionDto: CreateSeccionDto): Promise<Seccion> {
    const seccion = this.seccionRepository.create(createSeccionDto);
    return this.seccionRepository.save(seccion);
  }
}
