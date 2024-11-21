import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { JustificacionAusencia } from 'src/justificacion_ausencia/entities/justificacion_ausencia.entity';
import { AsistenciaStatus } from './entities/asistencia-status.enum';
import { Periodo } from 'src/periodo/entities/periodo.entity';

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

    @InjectRepository(Periodo)
    private periodoRepository: Repository<Periodo>,
  ) {}

  async crearAsistencia(
    createAsistenciaDtoArray: CreateAsistenciaDto[],
  ): Promise<Asistencia[]> {
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
        id_Periodo,
      } = createAsistenciaDto;

      const periodo = await this.periodoRepository.findOne({
        where: { id_Periodo },
      });
      if (!periodo) {
        throw new NotFoundException(
          `Periodo con ID ${id_Periodo} no encontrado`,
        );
      }

      const estudiante = await this.estudianteRepository.findOne({
        where: { id_Estudiante },
      });
      if (!estudiante) {
        throw new NotFoundException(
          `Estudiante con ID ${id_Estudiante} no encontrado`,
        );
      }

      const materia = await this.materiaRepository.findOne({
        where: { id_Materia },
      });
      if (!materia) {
        throw new NotFoundException(
          `Materia con ID ${id_Materia} no encontrada`,
        );
      }

      const grado = await this.gradoRepository.findOne({
        where: { id_grado },
      });
      if (!grado) {
        throw new NotFoundException(
          `Grado con ID ${id_grado} no encontrado`,
        );
      }

      const seccion = await this.seccionRepository.findOne({
        where: { id_Seccion },
      });
      if (!seccion) {
        throw new NotFoundException(
          `Sección con ID ${id_Seccion} no encontrada`,
        );
      }

      const profesor = await this.profesorRepository.findOne({
        where: { id_Profesor },
      });
      if (!profesor) {
        throw new NotFoundException(
          `Profesor con ID ${id_Profesor} no encontrado`,
        );
      }

      // Verificar si ya existe una asistencia con los mismos datos
      const asistenciaExistente = await this.asistenciaRepository.findOne({
        where: {
          fecha,
          id_Estudiante: estudiante,
          id_Materia: materia,
          id_Profesor: profesor,
          id_grado: grado,
          id_Seccion: seccion,
          id_Periodo: periodo,
        },
      });

      if (asistenciaExistente) {
        throw new BadRequestException(
          'Ya existe una asistencia registrada para este día con el mismo estudiante, materia, profesor, grado, sección y período.',
        );
      }

      const asistencia = this.asistenciaRepository.create({
        fecha: fecha,
        estado,
        id_Estudiante: estudiante,
        id_Materia: materia,
        id_grado: grado,
        id_Seccion: seccion,
        id_Profesor: profesor,
        id_Periodo: periodo,
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
      await this.asistenciaRepository.remove(asistencia);
    }
    
    //Revisar esta funcion porque la fecha es una fecha y no un string y me esta causando conflitos en conversion
    async findByDate(fecha: string): Promise<Asistencia[]> {
      const asistencias = await this.asistenciaRepository.find({
          where: { fecha },
          relations: [
              'id_Estudiante',
              'id_Materia',
              'id_grado',
              'id_Seccion',
              'id_Profesor',
          ],
      });
      if (!asistencias.length) {
          throw new NotFoundException(`No hay asistencias para la fecha ${fecha}`);
      }
      return asistencias;
  }


    async findByGrado(id_grado: number): Promise<Asistencia[]> {
      const asistencias = await this.asistenciaRepository
        .createQueryBuilder('asistencia')
        .leftJoinAndSelect('asistencia.id_Estudiante', 'estudiante')
        .leftJoinAndSelect('asistencia.id_Materia', 'materia')
        .leftJoinAndSelect('asistencia.id_grado', 'grado')
        .leftJoinAndSelect('asistencia.id_Seccion', 'seccion')
        .leftJoinAndSelect('asistencia.id_Profesor', 'profesor')
        .where('grado.id_grado = :id_grado', { id_grado })
        .getMany();
    
      if (!asistencias.length) {
        throw new NotFoundException(
          `No hay asistencias para el grado con ID ${id_grado}`,
        );
      }
      return asistencias;
    }

    async findByMateria(id_Materia: number): Promise<Asistencia[]> {
      const asistencias = await this.asistenciaRepository
        .createQueryBuilder('asistencia')
        .leftJoinAndSelect('asistencia.id_Estudiante', 'estudiante')
        .leftJoinAndSelect('asistencia.id_Materia', 'materia')
        .leftJoinAndSelect('asistencia.id_grado', 'grado')
        .leftJoinAndSelect('asistencia.id_Seccion', 'seccion')
        .leftJoinAndSelect('asistencia.id_Profesor', 'profesor')
        .where('materia.id_Materia = :id_Materia', { id_Materia })
        .getMany();

      if (!asistencias.length) {
        throw new NotFoundException(
          `No hay asistencias para la materia con ID ${id_Materia}`,
        );
      }
      return asistencias;
    }

    async findBySeccion(id_Seccion: number): Promise<Asistencia[]> {
      const asistencias = await this.asistenciaRepository
        .createQueryBuilder('asistencia')
        .leftJoinAndSelect('asistencia.id_Estudiante', 'estudiante')
        .leftJoinAndSelect('asistencia.id_Materia', 'materia')
        .leftJoinAndSelect('asistencia.id_grado', 'grado')
        .leftJoinAndSelect('asistencia.id_Seccion', 'seccion')
        .leftJoinAndSelect('asistencia.id_Profesor', 'profesor')
        .where('seccion.id_Seccion = :id_Seccion', { id_Seccion })
        .getMany();
    
      if (!asistencias.length) {
        throw new NotFoundException(
          `No hay asistencias para la sección con ID ${id_Seccion}`,
        );
      }
      return asistencias;[ ]
    }

    async actualizarAsistencia(
      id: number,
      updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<Asistencia> {
      const asistencia = await this.asistenciaRepository.findOne({
          where: { asistencia_id: id },
          relations: [
              'id_Estudiante',
              'id_Materia',
              'id_grado',
              'id_Seccion',
              'id_Profesor',
          ],
      });

      if (!asistencia) {
          throw new NotFoundException(`Asistencia con ID ${id} no encontrada`);
      }

      if (updateAsistenciaDto.fecha) {
          asistencia.fecha = updateAsistenciaDto.fecha; // Asignamos el string directamente
      }

      if (updateAsistenciaDto.estado) {
          asistencia.estado = updateAsistenciaDto.estado;
      }

      if (updateAsistenciaDto.id_Estudiante) {
          const estudiante = await this.estudianteRepository.findOne({
              where: { id_Estudiante: updateAsistenciaDto.id_Estudiante },
          });
          if (!estudiante) {
              throw new NotFoundException(
                  `Estudiante con ID ${updateAsistenciaDto.id_Estudiante} no encontrado`,
              );
          }
          asistencia.id_Estudiante = estudiante;
      }

      if (updateAsistenciaDto.id_Materia) {
          const materia = await this.materiaRepository.findOne({
              where: { id_Materia: updateAsistenciaDto.id_Materia },
          });
          if (!materia) {
              throw new NotFoundException(
                  `Materia con ID ${updateAsistenciaDto.id_Materia} no encontrada`,
              );
          }
          asistencia.id_Materia = materia;
      }

      if (updateAsistenciaDto.id_grado) {
          const grado = await this.gradoRepository.findOne({
              where: { id_grado: updateAsistenciaDto.id_grado },
          });
          if (!grado) {
              throw new NotFoundException(
                  `Grado con ID ${updateAsistenciaDto.id_grado} no encontrado`,
              );
          }
          asistencia.id_grado = grado;
      }

      if (updateAsistenciaDto.id_Seccion) {
          const seccion = await this.seccionRepository.findOne({
              where: { id_Seccion: updateAsistenciaDto.id_Seccion },
          });
          if (!seccion) {
              throw new NotFoundException(
                  `Sección con ID ${updateAsistenciaDto.id_Seccion} no encontrada`,
              );
          }
          asistencia.id_Seccion = seccion;
      }

      if (updateAsistenciaDto.id_Profesor) {
          const profesor = await this.profesorRepository.findOne({
              where: { id_Profesor: updateAsistenciaDto.id_Profesor },
          });
          if (!profesor) {
              throw new NotFoundException(
                  `Profesor con ID ${updateAsistenciaDto.id_Profesor} no encontrado`,
              );
          }
          asistencia.id_Profesor = profesor;
      }

      return this.asistenciaRepository.save(asistencia);
  }

  async findAsistenciasPorPeriodo(idPeriodo: number, filtros: any): Promise<Asistencia[]> {
    const query = this.asistenciaRepository.createQueryBuilder('asistencia')
      .leftJoinAndSelect('asistencia.id_Estudiante', 'estudiante')
      .leftJoinAndSelect('asistencia.id_Materia', 'materia')
      .leftJoinAndSelect('asistencia.id_grado', 'grado')
      .leftJoinAndSelect('asistencia.id_Seccion', 'seccion')
      .leftJoinAndSelect('asistencia.id_Profesor', 'profesor')
      .where('asistencia.id_Periodo = :idPeriodo', { idPeriodo });

    // Aplicar filtros si están presentes
    if (filtros.fecha) {
      query.andWhere('asistencia.fecha = :fecha', { fecha: filtros.fecha });
    }
    if (filtros.grado) {
      query.andWhere('asistencia.id_grado = :grado', { grado: filtros.grado });
    }
    if (filtros.materia) {
      query.andWhere('asistencia.id_Materia = :materia', { materia: filtros.materia });
    }
    if (filtros.seccion) {
      query.andWhere('asistencia.id_Seccion = :seccion', { seccion: filtros.seccion });
    }

    const asistencias = await query.getMany();

    if (asistencias.length === 0) {
      throw new NotFoundException(`No se encontraron asistencias para el periodo con ID ${idPeriodo}`);
    }

    return asistencias;
  }

  async obtenerAsistenciasPorCedulaConFiltros(
    cedula: string,
    fecha?: string,
    id_Materia?: string,
  ): Promise<Asistencia[]> {
    const query = this.asistenciaRepository
      .createQueryBuilder('asistencia')
      .leftJoinAndSelect('asistencia.id_Estudiante', 'id_Estudiante')
      .leftJoinAndSelect('asistencia.id_Materia', 'id_Materia')
      .leftJoinAndSelect('asistencia.id_grado', 'id_grado')
      .leftJoinAndSelect('asistencia.id_Seccion', 'id_Seccion')
      .leftJoinAndSelect('asistencia.id_Profesor', 'id_Profesor')
      .where('id_Estudiante.cedula = :cedula', { cedula });

    // Aplicar filtros opcionales

    if (fecha) {
      // Validar formato de fecha si es necesario
      query.andWhere('asistencia.fecha = :fecha', { fecha });
    }

    if (id_Materia) {
      const materiaId = Number(id_Materia);
      if (isNaN(materiaId)) {
        throw new BadRequestException('El parámetro id_Materia debe ser un número válido');
      }
      query.andWhere('id_Materia.id_Materia = :id_Materia', { id_Materia: materiaId });
    }

    const asistencias = await query.getMany();

    if (asistencias.length === 0) {
      throw new NotFoundException(
        `No se encontraron asistencias para la cédula ${cedula} con los filtros proporcionados`,
      );
    }

    return asistencias;
  }


  async obtenerReporteAsistencias(
    cedula: string,
    fechaInicio?: string,
    fechaFin?: string,
    id_Periodo?: number,
  ): Promise<Asistencia[]> {
    const query = this.asistenciaRepository
      .createQueryBuilder('asistencia')
      .leftJoinAndSelect('asistencia.id_Estudiante', 'estudiante')
      .leftJoinAndSelect('asistencia.id_Materia', 'materia')
      .leftJoinAndSelect('asistencia.id_grado', 'grado')
      .leftJoinAndSelect('asistencia.id_Seccion', 'seccion')
      .leftJoinAndSelect('asistencia.id_Profesor', 'profesor')
      .leftJoinAndSelect('asistencia.id_Periodo', 'periodo')
      .leftJoinAndSelect('asistencia.justificacionAusencia', 'justificacion');

    // Filtrar por cédula del estudiante
    query.where('estudiante.cedula = :cedula', { cedula });

    // Aplicar filtros opcionales
    if (fechaInicio && fechaFin) {
      query.andWhere('asistencia.fecha BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio,
        fechaFin,
      });
    } else if (fechaInicio) {
      query.andWhere('asistencia.fecha >= :fechaInicio', { fechaInicio });
    } else if (fechaFin) {
      query.andWhere('asistencia.fecha <= :fechaFin', { fechaFin });
    }

    if (id_Periodo !== undefined) {
      query.andWhere('periodo.id_Periodo = :id_Periodo', { id_Periodo });
    }

    const asistencias = await query.getMany();

    if (asistencias.length === 0) {
      throw new NotFoundException(
        `No se encontraron asistencias para la cédula ${cedula} con los filtros proporcionados`,
      );
    }

    return asistencias;
  }

}
