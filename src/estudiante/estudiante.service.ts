import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';

@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,

    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

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


  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante: id },
      relations: ['seccion'], // Incluye la relación con Seccion
    });
    
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
  
    return estudiante;
  }

  async obtenerHorariosPorEstudiante(id_Estudiante: number): Promise<any> {
    // Paso 1: Buscar el estudiante
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante },
      relations: ['grado'], // Incluye el grado
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id_Estudiante} no encontrado`);
    }

    const gradoId = estudiante.grado.id_grado; // Obtenemos el ID del grado

    // Paso 2: Buscar la sección correspondiente al grado
    const seccion = await this.seccionRepository.findOne({
      where: { grado: { id_grado: gradoId } },
      relations: ['horarios'], // Incluye los horarios
    });

    if (!seccion) {
      throw new NotFoundException(`No se encontró una sección para el grado con ID ${gradoId}`);
    }

    // Paso 3: Devolver los horarios de la sección
    return seccion.horarios;
  }













  


  async obtenerEstudiantesPorSeccion(id_Seccion: number): Promise<Estudiante[]> {
    const seccion = await this.seccionRepository.findOne({ where: { id_Seccion }, relations: ['estudiantes'] });
    if (!seccion) {
      throw new NotFoundException(`Sección con ID ${id_Seccion} no encontrada`);
    }
    return seccion.estudiantes;
  }

}