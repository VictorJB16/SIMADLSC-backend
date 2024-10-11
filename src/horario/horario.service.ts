// src/horario/horario.service.ts

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { Horario } from './entities/horario.entity';
import { CreateHorarioEstudianteDto } from './dto/create-horario-estudiante.dto';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Materia } from 'src/materia/entities/materia.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { UpdateHorarioEstudianteDto } from './dto/update-horario-estudiante.dto';

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
  async createHorarioEstudiante(createHorarioDto: CreateHorarioEstudianteDto): Promise<any> {
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
    if (!grado || !seccion || !materia || !profesor || !aula) {
        throw new NotFoundException('Una o más entidades no se encontraron.');
    }

    // Validar si el aula está disponible
    const aulaDisponible = await this.isAulaDisponible(aulaId, dia_semana_Horario, hora_inicio_Horario, hora_fin_Horario);
    if (!aulaDisponible) {
        throw new HttpException('El aula ya está ocupada en el horario especificado.', HttpStatus.CONFLICT);
    }

    // Validar si el profesor está disponible
    const profesorDisponible = await this.isProfesorDisponible(profesorId, dia_semana_Horario, hora_inicio_Horario, hora_fin_Horario);
    if (!profesorDisponible) {
        throw new HttpException('El profesor ya tiene otro horario asignado en el horario especificado.', HttpStatus.CONFLICT);
    }

    // Validar si la sección está disponible
    const seccionDisponible = await this.isSeccionDisponible(seccionId, dia_semana_Horario, hora_inicio_Horario, hora_fin_Horario);
    if (!seccionDisponible) {
        throw new HttpException('La sección ya tiene un horario asignado en el horario especificado.', HttpStatus.CONFLICT);
    }

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
    const savedHorario = await this.horarioRepository.save(horario);

    // Retornar el horario guardado, incluyendo las relaciones
    return {
        ...savedHorario,
        seccion: seccion.nombre_Seccion,
        materia: materia.nombre_Materia,
        profesor: `${profesor.nombre_Profesor} ${profesor.apellido1_Profesor} ${profesor.apellido2_Profesor}`,
    };
}





  






  async findAll(): Promise<Horario[]> {
    return await this.horarioRepository.find(
      { relations: ['profesor', 'seccion', 'materia', 'aula'] },
    );

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
    // Verificar si el profesor existe
    const profesor = await this.profesorRepository.findOne({ where: { id_Profesor: profesorId } });
  
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${profesorId} no encontrado`);
    }
  
    // Buscar horarios del profesor y cargar las relaciones necesarias
    const horarios = await this.horarioRepository.find({
      where: { profesor: { id_Profesor: profesorId } },
      relations: ['materia', 'seccion', 'aula'], // Cargar las relaciones que necesitas
    });
  
    return horarios;
  }
  

  async findOne(id: number): Promise<Horario> {
    const horario = await this.horarioRepository.findOne({ where: { id_Horario: id } });
    if (!horario) {
      throw new NotFoundException(`Horario con id ${id} no encontrado`);
    }
    return horario;
  }
  
  async eliminarHorario(id_Horario: number): Promise<boolean> {
    const resultado = await this.horarioRepository.delete(id_Horario);
    return resultado.affected > 0; // Retorna true si se eliminó el horario
  }

  async updateHorarioEstudante(id: number, updateHorarioEstudianteDto: UpdateHorarioEstudianteDto): Promise<Horario> {
    const horario = await this.horarioRepository.findOne({
        where: { id_Horario: id },
        relations: ['profesor', 'materia', 'grado', 'seccion', 'aula'],
    });

    if (!horario) {
        throw new NotFoundException(`Horario con id ${id} no encontrado`);
    }

    const { gradoId, seccionId, materiaId, profesorId, aulaId, dia_semana_Horario, hora_inicio_Horario, hora_fin_Horario } = updateHorarioEstudianteDto;

    // Actualizar entidades relacionadas si se han proporcionado
    if (gradoId) {
        const grado = await this.gradoRepository.findOne({ where: { id_grado: gradoId } });
        if (!grado) throw new NotFoundException(`Grado con id ${gradoId} no encontrado`);
        horario.grado = grado;
    }

    if (seccionId) {
        const seccion = await this.seccionRepository.findOne({ where: { id_Seccion: seccionId } });
        if (!seccion) throw new NotFoundException(`Sección con id ${seccionId} no encontrada`);
        horario.seccion = seccion;
    }

    if (materiaId) {
        const materia = await this.materiaRepository.findOne({ where: { id_Materia: materiaId } });
        if (!materia) throw new NotFoundException(`Materia con id ${materiaId} no encontrada`);
        horario.materia = materia;
    }

    if (profesorId) {
        const profesor = await this.profesorRepository.findOne({ where: { id_Profesor: profesorId } });
        if (!profesor) throw new NotFoundException(`Profesor con id ${profesorId} no encontrado`);
        horario.profesor = profesor;
    }

    if (aulaId) {
        const aula = await this.aulaRepository.findOne({ where: { id_aula: aulaId } });
        if (!aula) throw new NotFoundException(`Aula con id ${aulaId} no encontrada`);
        horario.aula = aula;
    }

    // Actualizar otros campos
    horario.dia_semana_Horario = dia_semana_Horario || horario.dia_semana_Horario;
    horario.hora_inicio_Horario = hora_inicio_Horario || horario.hora_inicio_Horario;
    horario.hora_fin_Horario = hora_fin_Horario || horario.hora_fin_Horario;

    // Guardar el horario actualizado
    return await this.horarioRepository.save(horario);
}

  
   // Método para obtener el horario de un profesor basado en su ID
   async getHorarioByProfesorId(profesorId: number): Promise<any> {
    const horarios = await this.horarioRepository.find({
      where: { profesor: { id_Profesor: profesorId } },
      relations: ['profesor', 'seccion', 'materia'], // Carga las relaciones necesarias
    });
  
    // Asegúrate de que hay horarios disponibles
    if (horarios.length === 0) {
      throw new Error('No se encontraron horarios para este profesor.');
    }
  
    // Formatear la respuesta para adaptarse al frontend
    return {
      nombreProfesor: horarios[0]?.profesor?.nombre_Profesor || 'Profesor Desconocido',
      apellido1Profesor: horarios[0]?.profesor?.apellido1_Profesor || '',
      apellido2Profesor: horarios[0]?.profesor?.apellido2_Profesor || '',
      horarios: horarios.map(horario => ({
        dia: horario.dia_semana_Horario,
        horaInicio: horario.hora_inicio_Horario,
        horaFin: horario.hora_fin_Horario,
        seccion: horario.seccion.nombre_Seccion,
        aula: horario.aula,
        asignatura: horario.materia.nombre_Materia,
      })),
      horasLecciones: this.obtenerHorasLecciones(horarios),
      diasSemana: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    };
  }
  

  // Método para obtener todas las horas de lecciones únicas
  private obtenerHorasLecciones(horarios: Horario[]): { inicio: string; fin: string }[] {
    const horasLecciones = horarios.map(horario => ({
      inicio: horario.hora_inicio_Horario,
      fin: horario.hora_fin_Horario,
    }));

    // Filtrar para obtener solo las horas únicas
    return horasLecciones.filter(
      (hora, index, self) =>
        index ===
        self.findIndex(
          (h) => h.inicio === hora.inicio && h.fin === hora.fin,
        ),
    );
  }

//Validaciones 

async isAulaDisponible(aulaId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  // Buscar si ya existe un horario en el aula en el mismo día que se solape con las horas propuestas
  const conflicto = await this.horarioRepository.findOne({
    where: {
      aula: { id_aula: aulaId },
      dia_semana_Horario: dia,
      hora_inicio_Horario: LessThanOrEqual(fin),
      hora_fin_Horario: MoreThanOrEqual(inicio),
    },
  });
  return !conflicto; // Retorna true si no hay conflictos, false si el aula está ocupada
}

async isProfesorDisponible(profesorId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  // Buscar si ya existe un horario asignado al profesor en el mismo día que se solape con las horas propuestas
  const conflicto = await this.horarioRepository.findOne({
    where: {
      profesor: { id_Profesor: profesorId },
      dia_semana_Horario: dia,
      hora_inicio_Horario: LessThanOrEqual(fin),
      hora_fin_Horario: MoreThanOrEqual(inicio),
    },
  });
  return !conflicto; // Retorna true si no hay conflictos, false si el profesor está ocupado
}
  

async isSeccionDisponible(seccionId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  // Buscar si ya existe un horario asignado a la sección en el mismo día que se solape con las horas propuestas
  const conflicto = await this.horarioRepository.findOne({
    where: {
      seccion: { id_Seccion: seccionId },
      dia_semana_Horario: dia,
      hora_inicio_Horario: LessThanOrEqual(fin),
      hora_fin_Horario: MoreThanOrEqual(inicio),
    },
  });
  return !conflicto; // Retorna true si no hay conflictos, false si la sección está ocupada
}



}