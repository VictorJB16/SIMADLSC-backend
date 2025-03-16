import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Periodo } from 'src/periodo/entities/periodo.entity';
import { Grado } from 'src/grados/entities/grados-entity';
import { EstadoMatricula } from './entities/Estado-Matricula.enum';
import { UpdateMatriculaDto } from './Dto/update-matricula.dto';
import { CreateMatriculaDto } from './Dto/create-matricula.dto';
import { AssignSeccionDto } from './Dto/assign-seccion.dto';
import { Seccion } from 'src/secciones/entities/seccion.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';
import { MailerCustomService } from 'src/mailer/mailer.service';
import * as crypto from 'crypto';
import { tipoadecuacion } from 'src/estudiante/entities/tipo-adecuacion.enum';

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
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerCustomService,
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



// Nuevo método para obtener los datos del Encargado Legal y del Estudiante
async findEncargadoAndEstudianteByMatriculaId(id: number) {
  const matricula = await this.matriculaRepository.findOne({
    where: { id_Matricula: id },
    relations: ['estudiante', 'encargadoLegal'],
  });

  if (!matricula) {
    throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
  }

  const { estudiante, encargadoLegal } = matricula;

  return {
    estudiante,
    encargadoLegal,
  };
}

// Método para eliminar una matrícula por su ID
async remove(id: number): Promise<void> {
  const matricula = await this.matriculaRepository.findOne({ where: { id_Matricula: id } });

  if (!matricula) {
    throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
  }

  await this.matriculaRepository.remove(matricula);
}



//Actualizar matricula
async updateMatricula(id: number, updateDto: UpdateMatriculaDto): Promise<Matricula> {
  // Buscar la matrícula existente
  const matricula = await this.matriculaRepository.findOne({
    where: { id_Matricula: id },
    relations: ['estudiante', 'encargadoLegal'],
  });
  if (!matricula) {
    throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
  }

  // Actualizar campos directos en la entidad `Matricula`


  // Actualizar los datos de `Estudiante` si están presentes en el DTO
  if (updateDto.estudiante) {
    let estudiante = matricula.estudiante;
    if (!estudiante) {
      estudiante = this.estudianteRepository.create();
    }
    Object.assign(estudiante, updateDto.estudiante);
    await this.estudianteRepository.save(estudiante);
    matricula.estudiante = estudiante;
  }

  // Actualizar los datos de `EncargadoLegal` si están presentes en el DTO
  if (updateDto.encargadoLegal) {
    let encargadoLegal = matricula.encargadoLegal;
    if (!encargadoLegal) {
      encargadoLegal = this.encargadoLegalRepository.create();
    }
    Object.assign(encargadoLegal, updateDto.encargadoLegal);
    await this.encargadoLegalRepository.save(encargadoLegal);
    matricula.encargadoLegal = encargadoLegal;
  }

  // Guardar los cambios en la matrícula y devolver la entidad actualizada
  return await this.matriculaRepository.save(matricula);
}

async findAll(): Promise<Matricula[]> {
  return await this.matriculaRepository.find({
    relations: {
      estudiante: {
        grado: true,
      },
      encargadoLegal: true,
      periodo: true,
    },
  });
}

async updateEstadoMatricula(id: number, nuevoEstado: string): Promise<Matricula> {
  const matricula = await this.matriculaRepository.findOne({
    where: { id_Matricula: id },
  });

  if (!matricula) {
    throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
  }

  // Solo se permite cambiar a "Aceptado" o "Rechazado"
  if (nuevoEstado !== EstadoMatricula.Aceptado && nuevoEstado !== EstadoMatricula.Rechazado) {
    throw new BadRequestException(
      `Estado no válido: ${nuevoEstado}. Solo se permiten: ${EstadoMatricula.Aceptado} o ${EstadoMatricula.Rechazado}.`
    );
  }

  matricula.estado_Matricula = nuevoEstado;
  return await this.matriculaRepository.save(matricula);
}

  // Función para obtener todas las matrículas que no tienen sección asignada
  async findMatriculasSinSeccion(): Promise<Matricula[]> {
    return await this.matriculaRepository.find({
      where: { seccion: IsNull() },
      relations: ['estudiante', 'estudiante.grado'], // incluir relaciones si es necesario
    });
  }

//! Método para asignar una sección a una o más matrículas
async assignSeccionToMatriculas(dto: AssignSeccionDto): Promise<Matricula[]> {
  const { seccionId, matriculaIds } = dto;

  // 1. Buscar la sección por su ID
  const seccion = await this.seccionRepository.findOne({
    where: { id_Seccion: seccionId },
  });
  if (!seccion) {
    throw new NotFoundException(`Sección con ID ${seccionId} no encontrada`);
  }

  const updatedMatriculas: Matricula[] = [];

  // 2. Iterar sobre cada ID de matrícula
  for (const matId of matriculaIds) {
    // Buscar la matrícula con sus relaciones: estudiante (y su grado) y sección
    const matricula = await this.matriculaRepository.findOne({
      where: { id_Matricula: matId },
      relations: {
        estudiante: { grado: true },
        seccion: true,
      },
    });

    if (!matricula) {
      throw new NotFoundException(`Matrícula con ID ${matId} no encontrada`);
    }

    // Verificar que la matrícula esté en estado Aceptado
    if (matricula.estado_Matricula !== EstadoMatricula.Aceptado) {
      throw new BadRequestException(
        `La matrícula con ID ${matId} no está en estado Aceptado (AC)`,
      );
    }

    // Verificar que el grado del estudiante coincida con la sección.gradoId
    const gradoEstudiante = matricula.estudiante.grado?.id_grado;
    if (gradoEstudiante !== seccion.gradoId) {
      throw new BadRequestException(
        `La matrícula ${matId} corresponde a un grado (${gradoEstudiante}) distinto a la sección (${seccion.gradoId})`,
      );
    }

    // 3. Asignar la sección a la matrícula
    matricula.seccion = seccion;
    await this.matriculaRepository.save(matricula);

    // 4. Asignar la misma sección al estudiante
    matricula.estudiante.seccion = seccion;
    await this.estudianteRepository.save(matricula.estudiante);

    updatedMatriculas.push(matricula);
  }

  return updatedMatriculas;
}  


private generateProvisionalPassword(): string {
  // Genera una contraseña provisional de 10 caracteres en hexadecimal
  return crypto.randomBytes(5).toString('hex');
}

@Cron(CronExpression.EVERY_HOUR)
async processAcceptedEnrollments() {
  try {
    // Buscar todas las matrículas con estado 'AC' (Aceptado) que no tengan usuario asignado en el estudiante
    const acceptedEnrollments = await this.matriculaRepository.find({
      where: { 
        estado_Matricula: EstadoMatricula.Aceptado,
        estudiante: { usuario: null }
      },
      relations: ['estudiante', 'estudiante.grado', 'estudiante.seccion', 'estudiante.encargadoLegal']
    });

    for (const enrollment of acceptedEnrollments) {
      try {
        const student = enrollment.estudiante;

        // Verificar que no exista ya un usuario asignado o que no exista un usuario con ese correo
        if (student.usuario) {
          continue;
        }
        const existingUser = await this.usersService.findUserByEmail(student.correo_estudiantil);
        if (existingUser) {
          continue;
        }

        const provisionalPassword = this.generateProvisionalPassword();

        // Crear solo el usuario (sin crear un nuevo estudiante) y asignarlo al estudiante existente
        const { usuario } = await this.usersService.createUserForExistingStudent(
          {
            nombre_Usuario: student.nombre_Estudiante,
            apellido1_Usuario: student.apellido1_Estudiante,
            apellido2_Usuario: student.apellido2_Estudiante,
            email_Usuario: student.correo_estudiantil,
            contraseña_Usuario: provisionalPassword,
            rol_Usuario: 4
          },
          student
        );

        // Enviar correo de bienvenida con las credenciales
        await this.mailerService.sendStudentCredentialsEmail(
          student.correo_estudiantil,
          student.nombre_Estudiante,
          student.correo_estudiantil, // el usuario es el correo
          provisionalPassword
        );

        console.log(`Se creó la cuenta de usuario para el estudiante: ${student.nombre_Estudiante} (${student.correo_estudiantil})`);
      } catch (error) {
        console.error(`Error al procesar la matrícula para el estudiante ${enrollment.estudiante.nombre_Estudiante}:`, error);
        // Continúa con la siguiente matrícula incluso si ocurre un error
      }
    }
  } catch (error) {
    console.error('Error en processAcceptedEnrollments:', error);
  }
}

}
