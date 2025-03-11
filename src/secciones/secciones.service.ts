import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Se incluye la relación 'grado' para que se cargue en la respuesta
  async findAll(): Promise<Seccion[]> {
    return this.seccionRepository.find({ relations: ['grado'] });
  }

  // Se incluye la relación 'grado' en el filtrado por grado
  async findByGrado(gradoId: number): Promise<Seccion[]> {
    return this.seccionRepository.find({
      where: { gradoId },
      relations: ['grado'],
    });
  }

  async create(createSeccionDto: CreateSeccionDto): Promise<Seccion> {
    const newseccion = this.seccionRepository.create(createSeccionDto);
    return this.seccionRepository.save(newseccion);
  }

  // Se incluye la relación 'grado' para que la respuesta incluya los datos del grado
  async findOne(id: number): Promise<Seccion> {
    const seccion = await this.seccionRepository.findOne({
      where: { id_Seccion: id },
      relations: ['grado'],
    });
    if (!seccion) {
      throw new NotFoundException(`Sección con ID ${id} no encontrada`);
    }
    return seccion;
  }

  // Método para eliminar una sección
  async deleteSeccion(id: number): Promise<boolean> {
    const seccion = await this.findOne(id);
    if (!seccion) {
      return false;
    }
    await this.seccionRepository.remove(seccion);
    return true;
  }
}
