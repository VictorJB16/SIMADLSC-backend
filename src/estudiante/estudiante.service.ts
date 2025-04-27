// src/Service/EstudianteService.ts
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Horario } from 'src/horario/entities/horario.entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { tipoadecuacion } from './entities/tipo-adecuacion.enum';
import { Grado } from 'src/grados/entities/grados-entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EstudianteService {

  private readonly logger = new Logger(EstudianteService.name);
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

    private readonly usersService: UsersService,
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
    return await this.estudianteRepository.find({
      relations: ['seccion', 'encargadoLegal', 'grado'],
    });
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
    const seccion = await this.seccionRepository.findOne({
      where: { id_Seccion },
      relations: ['estudiantes']
    });
    if (!seccion) {
      throw new NotFoundException(`Sección con ID ${id_Seccion} no encontrada`);
    }
    return seccion.estudiantes;
  }

  // Método para obtener solo los estudiantes de una sección específica usando Query Builder
  async findStudentsWithSectionById(id_Seccion: number): Promise<Estudiante[]> {
    return await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.seccion', 'seccion')
      .leftJoinAndSelect('estudiante.encargadoLegal', 'encargadoLegal')
      .leftJoinAndSelect('estudiante.grado', 'grado')
      .where('seccion.id_Seccion = :id_Seccion', { id_Seccion })
      .getMany();
  }

  

  async findByCedula(cedula: string): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { cedula },
      relations: ['seccion', 'encargadoLegal', 'grado'], // Incluye las relaciones necesarias
    });

    if (!estudiante) {
      throw new NotFoundException(`No se encontró un estudiante con la cédula: ${cedula}`);
    }

    return estudiante;
  }
  async deactivateStudent(id: number): Promise<Estudiante> {
    const est = await this.findOne(id);
    est.estado_Estudiante = 'Inactivo';
    est.seccion = null;
    est.grado = null;
    try {
      return await this.estudianteRepository.save(est);
    } catch {
      throw new InternalServerErrorException('No se pudo cambiar el estado del estudiante');
    }
  }

  async updateSection(id: number, seccionId: number): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    const seccion = await this.seccionRepository.findOne({
      where: { id_Seccion: seccionId },
    });
    if (!seccion) throw new NotFoundException(`Sección con ID ${seccionId} no encontrada`);
    estudiante.seccion = seccion;
    try {
      return await this.estudianteRepository.save(estudiante);
    } catch {
      throw new InternalServerErrorException('No se pudo actualizar la sección del estudiante');
    }
  }
  async graduateUndecimo(): Promise<Estudiante[]> {
    // 1) Buscar el grado “Undecimo”
    const grado = await this.gradoRepository.findOne({
      where: { nivel: 'Undecimo' },
    });
    if (!grado) {
      throw new NotFoundException(`Grado 'Undecimo' no encontrado`);
    }
  
    // 2) Obtener estudiantes activos de ese grado
    const estudiantes = await this.estudianteRepository.find({
      where: {
        grado: { id_grado: grado.id_grado },
        estado_Estudiante: 'Activo',
      },
    });
  
    const graduados: Estudiante[] = [];
  
    // 3) Procesar cada estudiante
    for (const estudiante of estudiantes) {
      estudiante.estado_Estudiante = 'Graduado';
      estudiante.grado = null;
      estudiante.seccion = null;
      await this.estudianteRepository.save(estudiante);
      graduados.push(estudiante);
  
      // 4) Bloquear el usuario del estudiante, pero si falla (404), lo ignoramos
      try {
        await this.usersService.toggleBlockUser(estudiante.id_Estudiante, true);
      } catch (err) {
        // Solo registramos, pero no abortamos todo el proceso
        this.logger.warn(
          `Al graduar estudiante ${estudiante.id_Estudiante}: no se pudo bloquear usuario. ${err.message}`
        );
      }
    }
  
    return graduados;
  }

}


