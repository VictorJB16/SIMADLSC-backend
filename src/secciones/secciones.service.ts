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

  async findByGrado(gradoId: number): Promise<Seccion[]> {
    return this.seccionRepository.find({
      where: { gradoId },
    });
  }

  async create(createSeccionDto: CreateSeccionDto): Promise<Seccion> {
    const newseccion = this.seccionRepository.create(createSeccionDto);
    return this.seccionRepository.save(newseccion);
  }


  async findOne(id: number): Promise<Seccion> {
    return this.seccionRepository.findOne({ where: { id_Seccion: id } });
  }


}
