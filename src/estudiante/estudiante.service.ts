import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { In, Repository } from 'typeorm';
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

  ) { }
  

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      console.error('Error creando el estudiante:', error);
      throw new InternalServerErrorException('No se pudo crear el estudiante');
    }
  }

    async createEstudiante (createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
      const { encargadoLegal, gradoId ,...estudianteData } = createEstudianteDto;

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
      relations: ['seccion'], // Incluye la relación con Seccion
    });
    

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
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


  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    try {
      Object.assign(estudiante, updateEstudianteDto);
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      console.error('Error actualizando el estudiante:', error);
      throw new InternalServerErrorException('No se pudo actualizar el estudiante');
    }
  }

  async remove(id: number): Promise<void> {
    const estudiante = await this.findOne(id);
    try {
      await this.estudianteRepository.remove(estudiante);
    } catch (error) {
      console.error('Error eliminando el estudiante:', error);
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
