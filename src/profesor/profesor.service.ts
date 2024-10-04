import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
     private readonly profesorRepository: Repository<Profesor>, 
  ) {}

  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const newProfesor = this.profesorRepository.create(createProfesorDto);
    return this.profesorRepository.save(newProfesor);
  }

  async findAll(): Promise<Profesor[]> {
    const allProfesores = await this.profesorRepository.find();
    return allProfesores;
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id_Profesor: id } });
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
