import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }
  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const newEstudiante = this.estudianteRepository.create(createEstudianteDto);
    return await this.estudianteRepository.save(newEstudiante);
  }


  async findAll(): Promise<Estudiante[]> {
    const allEstudiantes = await this.estudianteRepository.find();
    if (!allEstudiantes) {
      throw new NotFoundException('No se encontraron estudiantes');
    }
    return allEstudiantes;
  }


  async findOne(id: number): Promise<Estudiante> { {
    const estudiante = await this.estudianteRepository.findOne({ where: { id_Estudiante: id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;

  }
  
 }
 async findBySeccion(id_Seccion: number): Promise<Estudiante[]> {
  const estudiantes = await this.estudianteRepository.find({  
    where: { seccion: { id_Seccion: id_Seccion } },
  });
  if (!estudiantes.length) {
    throw new NotFoundException(`No se encontraron estudiantes para la sección con ID ${id_Seccion}`);
  }
  return estudiantes;
}

}