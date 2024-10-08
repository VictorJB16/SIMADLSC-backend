import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Horario } from 'src/horario/entities/horario.entity';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
     private readonly profesorRepository: Repository<Profesor>, 
     @InjectRepository(Horario)
     private readonly horarioRepository: Repository<Horario>,
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
