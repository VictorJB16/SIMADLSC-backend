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
        fecha: fecha,
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


  
}
