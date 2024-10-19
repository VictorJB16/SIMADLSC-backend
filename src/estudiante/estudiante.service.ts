import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';


@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      console.error('Error creando el estudiante:', error);
      throw new InternalServerErrorException('No se pudo crear el estudiante');
    }
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find();
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante: id },
    });
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    try {
      Object.assign(estudiante, updateEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      console.error('Error actualizando el estudiante:', error);
      throw new InternalServerErrorException('No se pudo actualizar el estudiante');
    }
  }

  async remove(id: number): Promise<void> {
    const estudiante = await this.findOne(id);
    try {
      await this.estudianteRepository.remove(estudiante);
    } catch (error) {
      console.error('Error eliminando el estudiante:', error);
      throw new InternalServerErrorException('No se pudo eliminar el estudiante');
    }
  }
}
