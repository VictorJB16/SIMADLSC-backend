import { Injectable, NotFoundException } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { EstadoMatricula } from './entities/Estado-Matricula.enum';
@Injectable()
export class MatriculaService {
  constructor(
    @InjectRepository(Matricula)
    private readonly matriculaRepository: Repository<Matricula>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(EncargadoLegal)
    private readonly encargadoLegalRepository: Repository<EncargadoLegal>,
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
  ) {}

  async create(createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    const { periodo, estudiante: estudianteData, encargadoLegal: encargadoLegalData } = createMatriculaDto;

    // 1. Buscar el Periodo por su ID
    const periodoEntity = await this.periodoRepository.findOne({ where: { id_Periodo: periodo } });
    if (!periodoEntity) {
      throw new NotFoundException(`Periodo con ID ${periodo} no encontrado`);
    }

    // 2. Crear y guardar el Encargado Legal
    const encargadoLegalEntity = this.encargadoLegalRepository.create(encargadoLegalData);
    await this.encargadoLegalRepository.save(encargadoLegalEntity);

    // 3. Buscar el Grado por su ID proporcionado en estudianteData.gradoId
    const gradoEntity = await this.gradoRepository.findOne({where : {id_grado: estudianteData.gradoId}});
    if (!gradoEntity) {
      throw new NotFoundException(`Grado con ID ${estudianteData.gradoId} no encontrado`);
    }

    // 4. Crear y guardar el Estudiante
    const estudianteEntity = this.estudianteRepository.create({
      ...estudianteData,
      encargadoLegal: encargadoLegalEntity,
      grado: gradoEntity,
    });
    await this.estudianteRepository.save(estudianteEntity);

    // 5. Generar fechas de creación y actualización
    const currentDate = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

    // 6. Crear la Matrícula y establecer las relaciones
    const matriculaEntity = this.matriculaRepository.create({
      fecha_creacion_Matricula: currentDate,
      fecha_actualizacion_Matricula: currentDate,
      estado_Matricula: EstadoMatricula.Pendiente,
      estudiante: estudianteEntity,
      encargadoLegal: encargadoLegalEntity,
      periodo: periodoEntity,
    });
    await this.matriculaRepository.save(matriculaEntity);

    return matriculaEntity;
  }

  async findAll(): Promise<Matricula[]> {
    return await this.matriculaRepository.find();
  }
}
