import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Grado } from 'src/grados/entities/grados-entity';

@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
  ) { }
  async createStudent(data: {
    nombre_Estudiante: string;
    apellido1_Estudiante: string;
    apellido2_Estudiante: string;
    estado_Estudiante?: string;
    seccionId: number;
    gradoId: number;
  }): Promise<Estudiante> {
    const { nombre_Estudiante, apellido1_Estudiante, apellido2_Estudiante, estado_Estudiante, seccionId, gradoId } = data;

    const seccion = await this.seccionRepository.findOne({ where: { id_Seccion: seccionId } });    if (!seccion) throw new NotFoundException(`Sección con ID ${seccionId} no encontrada`);

    const grado = await this.gradoRepository.findOne({ where: { id_grado: gradoId } });    if (!grado) throw new NotFoundException(`Grado con ID ${gradoId} no encontrado`);

    const estudiante = this.estudianteRepository.create({
      nombre_Estudiante,
      apellido1_Estudiante,
      apellido2_Estudiante,
      estado_Estudiante,
      seccion,
      grado,
    });

    return await this.estudianteRepository.save(estudiante);
  }

  async findStudentsBySectionAndGrade(seccionId: number, gradoId: number): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      where: {
        seccion: { id_Seccion: seccionId },
        grado: { id_grado: gradoId },
      },
      relations: ['seccion', 'grado'],
    });
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


}