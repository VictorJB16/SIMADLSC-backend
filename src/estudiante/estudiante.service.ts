import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { tipoadecuacion } from './entities/tipo-adecuacion.enum';
import { Grado } from 'src/grados/entities/grados-entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,

    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

    @InjectRepository(EncargadoLegal)
    private readonly encargadoLegalRepository: Repository<EncargadoLegal>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el estudiante');
    }
  }

  async createEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const { encargadoLegal, gradoId, ...estudianteData } = createEstudianteDto;

    const encargadoLegalEntity = this.encargadoLegalRepository.create(encargadoLegal);
    await this.encargadoLegalRepository.save(encargadoLegalEntity);

    const grado = await this.gradoRepository.findOne({ where: { id_grado: gradoId } });
    if (!grado) {
      throw new NotFoundException(`Grado con ID ${gradoId} no encontrado`);
    }

    const estudiante = this.estudianteRepository.create({
      ...estudianteData,
      tipo_de_adecuacion: estudianteData.tipo_de_adecuacion as tipoadecuacion,
      encargadoLegal: encargadoLegalEntity,
      grado: grado,
    });

    return await this.estudianteRepository.save(estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find();
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante: id },
      relations: ['seccion', 'encargadoLegal', 'grado'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return estudiante;
  }

  /**
   * Filtra estudiantes por nombre, apellido y cédula.
   * Se convierte a minúsculas para comparación insensible a mayúsculas.
   */
  async findByFilters(filters: {
    nombre?: string;
    cedula?: string;
    apellido?: string;
  }): Promise<Estudiante[]> {
    const query = this.estudianteRepository.createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.encargadoLegal', 'encargadoLegal')
      .leftJoinAndSelect('estudiante.grado', 'grado');

    if (filters.nombre && filters.nombre.trim() !== '') {
      query.andWhere('LOWER(estudiante.nombre_Estudiante) LIKE :nombre', {
        nombre: `%${filters.nombre.trim().toLowerCase()}%`
      });
    }
    if (filters.cedula && filters.cedula.trim() !== '') {
      query.andWhere('estudiante.cedula LIKE :cedula', {
        cedula: `%${filters.cedula.trim()}%`
      });
    }
    if (filters.apellido && filters.apellido.trim() !== '') {
      query.andWhere(
        '(LOWER(estudiante.apellido1_Estudiante) LIKE :apellido OR LOWER(estudiante.apellido2_Estudiante) LIKE :apellido)',
        { apellido: `%${filters.apellido.trim().toLowerCase()}%` }
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener estudiantes con filtros');
    }
  }

  async getEstudiantes(search: string): Promise<Estudiante[]> {
    if (!search || search.trim() === '') {
      return this.findAll();
    }
    return await this.estudianteRepository.createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.encargadoLegal', 'encargadoLegal')
      .leftJoinAndSelect('estudiante.grado', 'grado')
      .where('estudiante.nombre_Estudiante LIKE :search OR estudiante.cedula LIKE :search', { search: `%${search.trim()}%` })
      .getMany();
  }

  async obtenerHorariosPorEstudiante(id_Estudiante: number): Promise<any> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante },
      relations: ['grado'],
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id_Estudiante} no encontrado`);
    }

    const gradoId = estudiante.grado.id_grado;
    const seccion = await this.seccionRepository.findOne({
      where: { grado: { id_grado: gradoId } },
      relations: ['horarios'],
    });

    if (!seccion) {
      throw new NotFoundException(`No se encontró una sección para el grado con ID ${gradoId}`);
    }

    return seccion.horarios;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    try {
      Object.assign(estudiante, updateEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      
      throw new InternalServerErrorException('No se pudo actualizar el estudiante');
    }
  }

  async remove(id: number): Promise<void> {
    const estudiante = await this.findOne(id);
    try {
      await this.estudianteRepository.remove(estudiante);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar el estudiante');
    }
  }

  async obtenerEstudiantesPorSeccion(id_Seccion: number): Promise<Estudiante[]> {
    const seccion = await this.seccionRepository.findOne({ where: { id_Seccion }, relations: ['estudiantes'] });
    if (!seccion) {
      throw new NotFoundException(`Sección con ID ${id_Seccion} no encontrada`);
    }
    return seccion.estudiantes;
  }
}
