import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { JustificacionAusencia } from 'src/justificacion_ausencia/entities/justificacion_ausencia.entity';
import { AsistenciaStatus } from './entities/asistencia-status.enum';

@Injectable()
export class AsistenciasService {

  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,

    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Materia)
    private materiaRepository: Repository<Materia>,

    @InjectRepository(Grado)
    private gradoRepository: Repository<Grado>,

    @InjectRepository(Seccion)
    private seccionRepository: Repository<Seccion>,

    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async crearAsistencia(createAsistenciaDtoArray: CreateAsistenciaDto[]): Promise<Asistencia[]> {
    const asistencias: Asistencia[] = [];

    for (const createAsistenciaDto of createAsistenciaDtoArray) {
      const {
        fecha,
        estado,
        id_Estudiante,
        id_Materia,
        id_grado,
        id_Seccion,
        id_Profesor,
      } = createAsistenciaDto;

      const estudiante = await this.estudianteRepository.findOne({ where: { id_Estudiante } });
      if (!estudiante) {
        throw new NotFoundException(`Estudiante con ID ${id_Estudiante} no encontrado`);
      }

      const materia = await this.materiaRepository.findOne({ where: { id_Materia } });
      if (!materia) {
        throw new NotFoundException(`Materia con ID ${id_Materia} no encontrada`);
      }

      const grado = await this.gradoRepository.findOne({ where: { id_grado } });
      if (!grado) {
        throw new NotFoundException(`Grado con ID ${id_grado} no encontrado`);
      }

      const seccion = await this.seccionRepository.findOne({ where: { id_Seccion } });
      if (!seccion) {
        throw new NotFoundException(`Sección con ID ${id_Seccion} no encontrada`);
      }

      const profesor = await this.profesorRepository.findOne({ where: { id_Profesor } });
      if (!profesor) {
        throw new NotFoundException(`Profesor con ID ${id_Profesor} no encontrado`);
      }

      const asistencia = this.asistenciaRepository.create({
        fecha: new Date(fecha),
        estado,
        id_Estudiante: estudiante,
        id_Materia: materia,
        id_grado: grado,
        id_Seccion: seccion,
        id_Profesor: profesor,
      });

      asistencias.push(asistencia);
    }

    return this.asistenciaRepository.save(asistencias);
  }

  async findAll(): Promise<Asistencia[]> {
    return this.asistenciaRepository.find({
      relations: ['id_Estudiante', 'id_Materia', 'id_grado', 'id_Seccion', 'id_Profesor'],
    });
  }

  async findById(id: number): Promise<Asistencia> {
    const asistencia = await this.asistenciaRepository.findOne({ where: { asistencia_id: id }, relations: ['id_Estudiante', 'id_Materia', 'id_grado', 'id_Seccion', 'id_Profesor'] });
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada`);
    }
    return asistencia;
  }


  async eliminarAsistencia(id: number): Promise<void> {
    const asistencia = await this.findById(id);
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada`);
    }
    await this.asistenciaRepository.delete(asistencia);
  }
  
}
