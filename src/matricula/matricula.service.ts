import { Injectable, NotFoundException } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
import { Grado } from 'src/grados/entities/grados-entity';
//import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
//import { Usuario } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {  DataSource, Repository } from 'typeorm';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { Seccion } from 'src/secciones/entities/seccion.entity';
//import { UpdateMatriculaDto } from './dto/update-matricula.dto';





@Injectable()
export class MatriculaService {
  datasource: any;
  constructor(
    @InjectRepository(Matricula)
    private readonly matriculaRepository: Repository<Matricula>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(EncargadoLegal)
    private readonly encargadoLegalRepository: Repository<EncargadoLegal>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,

    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    const {
      estado_Matricula,
      gradoId,
      seccionId,
      fecha_matricula_Matricula,
      rol_Usuario,
      
     
      
Presenta_adecuacion,
      tipo_de_adecuacion,
      estudiante,
      encargadoLegal,
    } = createMatriculaDto;

    
      tipo_de_adecuacion
// Usar una transacción para asegurar la atomicidad
    return await this.dataSource.transaction(async (manager) => {
      // Crear el Encargado Legal
      const encargadoLegalEntity = manager.create(EncargadoLegal, encargadoLegal);
      await manager.save(encargadoLegalEntity);

      // Crear el Estudiante y asociarlo con el Encargado Legal
      const estudianteEntity = manager.create(Estudiante, {
        ...estudiante,
        
        ...estudiante,
encargadoLegal: encargadoLegalEntity,
      });
      await manager.save(estudianteEntity);

      // Buscar Grado
      const grado = await manager.findOne(Grado, {
        where: {id_grado: gradoId },
      });

      if (!grado) {
        throw new NotFoundException('Grado no encontrado');
      }

      // Buscar Sección
      
      
const seccion = await manager.findOne(Seccion, {
        where: {id_Seccion: seccionId },
      });

      if (!seccion) {
        throw new NotFoundException('Sección no encontrada');
      }

      // Crear la Matrícula
      const matricula = manager.create(Matricula, {
        estado_Matricula,
        
        
fecha_matricula_Matricula: new Date(fecha_matricula_Matricula),
        rol_Usuario,
        Presenta_adecuacion,
        tipo_de_adecuacion,
        grado: grado,
        seccion: seccion,
        estudiantes: estudianteEntity,
        encargadoLegal: encargadoLegalEntity,
        
  
// `fecha_creacion_Matricula` y `fecha_actualizacion_Matricula` se manejan automáticamente
      });

      // Guardar la Matrícula
      return await manager.save(matricula);
    });
  }

  async findAll(): Promise<Matricula[]> {
    
    
return await this.matriculaRepository.find({
      relations: ['estudiantes', 'encargadoLegal', 'grado', 'seccion'],
    });
  }

  async findOne(id: number): Promise<Matricula> {
    const matricula = await this.matriculaRepository.findOne({
      
      
where: { id_Matricula: id },
      relations: ['estudiantes', 'encargadoLegal', 'grado', 'seccion'],
    });

    if (!matricula) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }

    return matricula;
  }

  // Método opcional para obtener datos del estudiante y encargado legal
  async getDatosParaCrearMatricula(id_Estudiante: number): Promise<{ estudiante: Estudiante; encargadoLegal: EncargadoLegal }> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id_Estudiante },
      
      
relations: ['encargadoLegal'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const encargadoLegal = estudiante.encargadoLegal;

    if (!encargadoLegal) {
      throw new NotFoundException('Encargado Legal no encontrado para el estudiante');
    }

    return { estudiante, encargadoLegal };
  }
}

