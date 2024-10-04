import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MateriaService {

    
    constructor(
      @InjectRepository(Materia)
      private materiaRepository: Repository<Materia>
    ) {}
  create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const newMateria = this.materiaRepository.create(createMateriaDto);
    return this.materiaRepository.save(newMateria);
  }

  findAll(): Promise<Materia[]> {
    return this.materiaRepository.find();
  }

  findOne(id: number): Promise<Materia> {
    if (!id) {
      throw new NotFoundException('Materia no encontrada');
    }
    return this.materiaRepository.findOne({ where: { id_Materia: id } });

  }


}
