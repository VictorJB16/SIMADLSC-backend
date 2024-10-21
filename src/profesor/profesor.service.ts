import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from 'src/materia/entities/materia.entity';

import { Horario } from 'src/horario/entities/horario.entity';


@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
     private readonly profesorRepository: Repository<Profesor>, 

     @InjectRepository(Materia)
     private readonly materiaRepository: Repository<Materia>,

     @InjectRepository(Horario)
     private readonly horarioRepository: Repository<Horario>,

  ) {}

  async crearProfesor(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const {
      nombre_Profesor,
      apellido1_Profesor,
      apellido2_Profesor,
      id_Materia,
    } = createProfesorDto;

    // Validar y obtener la Materia
    const materia = await this.materiaRepository.findOne({
      where: { id_Materia },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id_Materia} no encontrada`);
    }

    // Crear el Profesor
    const profesor = new Profesor();
    profesor.nombre_Profesor = nombre_Profesor;
    profesor.apellido1_Profesor = apellido1_Profesor;
    profesor.apellido2_Profesor = apellido2_Profesor;

    // Asociar el Profesor con la Materia
    profesor.id_Materia = [materia];

    // Guardar el Profesor
    return await this.profesorRepository.save(profesor);
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

  async obtenerHorarioProfesor(id: number) {
    // Obtener el profesor
    const profesor = await this.profesorRepository.findOne({
      where: { id_Profesor: id },
    });

    if (!profesor) {
      throw new NotFoundException('Profesor no encontrado');
    }

    // Obtener los horarios del profesor
    const horarios = await this.horarioRepository.find({
      where: { profesor: { id_Profesor: id } },
      relations: ['materia', 'aula', 'seccion'],
    });

    // Transformar los datos al formato esperado por el frontend
    const horariosFormateados = horarios.map((horario) => ({
      dia: horario.dia_semana_Horario,
      horaInicio: horario.hora_inicio_Horario,
      horaFin: horario.hora_fin_Horario,
      asignatura: horario.materia.nombre_Materia,
      aula: horario.aula.nombre_Aula,
      seccion: horario.seccion.nombre_Seccion,
    }));

    return {
      nombreProfesor: `${profesor.nombre_Profesor} ${profesor.apellido1_Profesor} ${profesor.apellido2_Profesor}`,
      horarios: horariosFormateados,
    };
  }

}
