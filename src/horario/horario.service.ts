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
import { differenceInMinutes } from 'date-fns';

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
  
      // Validar que el horario tenga un mínimo de 40 minutos
      const duracionMinutos = differenceInMinutes(
          new Date(`1970-01-01T${hora_fin_Horario}`),
          new Date(`1970-01-01T${hora_inicio_Horario}`)
      );
  
      if (duracionMinutos < 40) {
          throw new HttpException(
              'La duración del horario debe ser de al menos 40 minutos.',
              HttpStatus.BAD_REQUEST
          );
      }
  
      // Buscar entidades relacionadas
      const [grado, seccion, materia, profesor, aula] = await Promise.all([
          this.gradoRepository.findOne({ where: { id_grado: gradoId } }),
          this.seccionRepository.findOne({ where: { id_Seccion: seccionId } }),
          this.materiaRepository.findOne({ where: { id_Materia: materiaId } }),
          this.profesorRepository.findOne({ where: { id_Profesor: profesorId } }),
          this.aulaRepository.findOne({ where: { id_aula: aulaId } }),
      ]);
  
      // Verificar existencia de entidades
      if (!grado || !seccion || !materia || !profesor || !aula) {
          throw new NotFoundException('Una o más entidades no se encontraron.');
      }
  
      // Validaciones de disponibilidad
      await this.validarDisponibilidad(aulaId, profesorId, seccionId, dia_semana_Horario, hora_inicio_Horario, hora_fin_Horario);
  
      // Crear nueva instancia de Horario
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
  
      // Guardar el horario
      const savedHorario = await this.horarioRepository.save(horario);
  
      // Retornar el horario guardado
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

  async findBySeccion(id_Seccion: number): Promise<Horario[]> {
    const horarios = await this.horarioRepository.find({
      where: { seccion: { id_Seccion } },
      relations: ['materia', 'aula', 'profesor'],
    });

    if (horarios.length === 0) {
      throw new NotFoundException(`No se encontraron horarios para la sección con ID ${id_Seccion}`);
    }

    return horarios;
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

    const errors: string[] = [];

    // Validar la duración mínima de 40 minutos
    const inicio = hora_inicio_Horario || horario.hora_inicio_Horario;
    const fin = hora_fin_Horario || horario.hora_fin_Horario;

    const duracionMinutos = differenceInMinutes(
        new Date(`1970-01-01T${fin}`),
        new Date(`1970-01-01T${inicio}`)
    );

    if (duracionMinutos < 40) {
        errors.push('La duración del horario debe ser de al menos 40 minutos.');
    }

    // Validar la existencia de entidades relacionadas si se proporcionaron nuevos IDs
    const [grado, seccion, materia, profesor, aula] = await Promise.all([
        gradoId ? this.gradoRepository.findOne({ where: { id_grado: gradoId } }) : horario.grado,
        seccionId ? this.seccionRepository.findOne({ where: { id_Seccion: seccionId } }) : horario.seccion,
        materiaId ? this.materiaRepository.findOne({ where: { id_Materia: materiaId } }) : horario.materia,
        profesorId ? this.profesorRepository.findOne({ where: { id_Profesor: profesorId } }) : horario.profesor,
        aulaId ? this.aulaRepository.findOne({ where: { id_aula: aulaId } }) : horario.aula,
    ]);

    if (!grado) errors.push(`Grado con id ${gradoId} no encontrado`);
    if (!seccion) errors.push(`Sección con id ${seccionId} no encontrada`);
    if (!materia) errors.push(`Materia con id ${materiaId} no encontrada`);
    if (!profesor) errors.push(`Profesor con id ${profesorId} no encontrado`);
    if (!aula) errors.push(`Aula con id ${aulaId} no encontrada`);

    // Si hubo errores de validación, lanzamos una excepción
    if (errors.length > 0) {
        throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    // Validaciones de disponibilidad
    await this.validarDisponibilidad(
        aulaId || horario.aula.id_aula,
        profesorId || horario.profesor.id_Profesor,
        seccionId || horario.seccion.id_Seccion,
        dia_semana_Horario || horario.dia_semana_Horario,
        inicio,
        fin
    );

    // Actualizar los campos de la entidad
    horario.grado = grado;
    horario.seccion = seccion;
    horario.materia = materia;
    horario.profesor = profesor;
    horario.aula = aula;
    horario.dia_semana_Horario = dia_semana_Horario || horario.dia_semana_Horario;
    horario.hora_inicio_Horario = hora_inicio_Horario || horario.hora_inicio_Horario;
    horario.hora_fin_Horario = hora_fin_Horario || horario.hora_fin_Horario;

    // Guardar el horario actualizado en la base de datos
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
async validarDisponibilidad(aulaId: number, profesorId: number, seccionId: number, dia: string, inicio: string, fin: string): Promise<void> {
  const aulaDisponible = await this.isAulaDisponible(aulaId, dia, inicio, fin);
  if (!aulaDisponible) {
      throw new HttpException('El aula ya está ocupada en el horario especificado.', HttpStatus.CONFLICT);
  }

  const profesorDisponible = await this.isProfesorDisponible(profesorId, dia, inicio, fin);
  if (!profesorDisponible) {
      throw new HttpException('El profesor ya tiene otro horario asignado en el horario especificado.', HttpStatus.CONFLICT);
  }

  const seccionDisponible = await this.isSeccionDisponible(seccionId, dia, inicio, fin);
  if (!seccionDisponible) {
      throw new HttpException('La sección ya tiene un horario asignado en el horario especificado.', HttpStatus.CONFLICT);
  }
}

async isAulaDisponible(aulaId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  const conflicto = await this.horarioRepository.findOne({
      where: {
          aula: { id_aula: aulaId },
          dia_semana_Horario: dia,
          hora_inicio_Horario: LessThanOrEqual(fin),
          hora_fin_Horario: MoreThanOrEqual(inicio),
      },
  });
  return !conflicto;
}

async isProfesorDisponible(profesorId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  const conflicto = await this.horarioRepository.findOne({
      where: {
          profesor: { id_Profesor: profesorId },
          dia_semana_Horario: dia,
          hora_inicio_Horario: LessThanOrEqual(fin),
          hora_fin_Horario: MoreThanOrEqual(inicio),
      },
  });
  return !conflicto;
}

async isSeccionDisponible(seccionId: number, dia: string, inicio: string, fin: string): Promise<boolean> {
  const conflicto = await this.horarioRepository.findOne({
      where: {
          seccion: { id_Seccion: seccionId },
          dia_semana_Horario: dia,
          hora_inicio_Horario: LessThanOrEqual(fin),
          hora_fin_Horario: MoreThanOrEqual(inicio),
      },
  });
  return !conflicto;
}



}