// src/horario/horario.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Horario } from './entities/horario.entity';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { CreateHorarioProfesorDto } from './dto/create-horario-profesor.dto';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,

    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,

    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,
  ) {}

  /**
   * Crear Horario para Estudiantes (Asignado a una Sección con un Profesor específico)
   * @param createHorarioDto Datos para crear el horario
   * @returns Horario creado
   */

  

  async createHorarioEstudiante(createHorarioDto: CreateHorarioEstudianteDto): Promise<Horario> {
    const {
      gradoId,
      seccionId,
      materiaId,
      profesorId,
      dia_semana_Horario,
      hora_inicio_Horario,
      hora_fin_Horario,
      aulaId,
    } = createHorarioDto;

    // Buscar las entidades relacionadas
    const [grado, seccion, materia, profesor, aula] = await Promise.all([
      this.gradoRepository.findOne({ where: { id_grado: gradoId } }),
      this.seccionRepository.findOne({ where: { id_Seccion: seccionId } }),
      this.materiaRepository.findOne({ where: { id_Materia: materiaId } }),
      this.profesorRepository.findOne({ where: { id_Profesor: profesorId } }),
      this.aulaRepository.findOne({ where: { id_aula: aulaId } }),
    ]);

    // Verificar si las entidades existen
    if (!grado) {
      throw new NotFoundException(`Grado con id ${gradoId} no encontrado`);
    }

    if (!seccion) {
      throw new NotFoundException(`Sección con id ${seccionId} no encontrada`);
    }

    if (!materia) {
      throw new NotFoundException(`Materia con id ${materiaId} no encontrada`);
    }

    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${profesorId} no encontrado`);
    }

    if (!aula) {
      throw new NotFoundException(`Aula con id ${aulaId} no encontrada`);
    }

    // Verificar si el profesor puede impartir la materia (Opcional)
    // Aquí podrías agregar lógica para verificar si el profesor está asignado a la materia
    // Por ejemplo, si hay una relación entre Profesor y Materia

    // Crear una nueva instancia de Horario
    const horario = this.horarioRepository.create({
      dia_semana_Horario,
      hora_inicio_Horario,
      hora_fin_Horario,
      grado,
      seccion,
      materia,
      aula,
      profesor,
    });

    // Guardar el horario en la base de datos
    return await this.horarioRepository.save(horario);
  }

  /**
   * Crear Horario para Profesores (Asignado a un Profesor específico)
   * @param createHorarioProfesorDto Datos para crear el horario
   * @returns Horario creado
   */
  async createHorarioProfesor(createHorarioProfesorDto: CreateHorarioProfesorDto): Promise<Horario> {
    const {
      profesorId,
      gradoId,
      materiaId,
      dia_semana_Horario,
      hora_inicio_Horario,
      hora_fin_Horario,
      aulaId,
    } = createHorarioProfesorDto;

    // Buscar las entidades relacionadas
    const [profesor, grado, materia, aula] = await Promise.all([
      this.profesorRepository.findOne({ where: { id_Profesor: profesorId } }),
      this.gradoRepository.findOne({ where: { id_grado: gradoId } }),
      this.materiaRepository.findOne({ where: { id_Materia: materiaId } }),
      this.aulaRepository.findOne({ where: { id_aula: aulaId } }),
    ]);

    // Verificar si las entidades existen
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${profesorId} no encontrado`);
    }

    if (!grado) {
      throw new NotFoundException(`Grado con id ${gradoId} no encontrado`);
    }

    if (!materia) {
      throw new NotFoundException(`Materia con id ${materiaId} no encontrada`);
    }

    if (!aula) {
      throw new NotFoundException(`Aula con id ${aulaId} no encontrada`);
    }

    // Verificar si el profesor puede impartir la materia (Opcional)
    // Aquí podrías agregar lógica para verificar si el profesor está asignado a la materia

    // Crear una nueva instancia de Horario
    const horario = this.horarioRepository.create({
      dia_semana_Horario,
      hora_inicio_Horario,
      hora_fin_Horario,
      grado,
      materia,
      aula,
      profesor,
      seccion: null, // No asignado a ninguna sección
    });

    // Guardar el horario en la base de datos
    return await this.horarioRepository.save(horario);
  }

  async findAll(): Promise<Horario[]> {
    return await this.horarioRepository.find();
  }

  async findBySeccion(seccionId: number): Promise<Horario[]> {
    const seccion = await this.seccionRepository.findOne({ where: { id_Seccion: seccionId } });

    if (!seccion) {
      throw new NotFoundException(`Sección con id ${seccionId} no encontrada`);
    }

    return await this.horarioRepository.find({
      where: { seccion: { id_Seccion: seccionId } },
    });
  }

  async findByProfesor(profesorId: number): Promise<Horario[]> {
    const profesor = await this.profesorRepository.findOne({ where: { id_Profesor: profesorId } });

    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${profesorId} no encontrado`);
    }

    return await this.horarioRepository.find({
      where: { profesor: { id_Profesor: profesorId } },
    });
  }

  async findOne(id: number): Promise<Horario> {
    const horario = await this.horarioRepository.findOne({ where: { id_Horario: id } });
    if (!horario) {
      throw new NotFoundException(`Horario con id ${id} no encontrado`);
    }
    return horario;
  }

}
