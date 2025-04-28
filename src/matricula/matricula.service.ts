import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Matricula } from './entities/matricula.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EncargadoLegal } from 'src/encargado-legal/entities/encargado-legal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerCustomService,
  ) {}

  async create(createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    const { estudiante: estudianteData, encargadoLegal: encargadoLegalData } = createMatriculaDto;

    // 1. Buscar (o crear) el Encargado Legal usando su N_Cedula
    let encargadoLegalEntity: EncargadoLegal;
    if (encargadoLegalData.N_Cedula) {
      const existingEncargado = await this.encargadoLegalRepository.findOne({
        where: { N_Cedula: encargadoLegalData.N_Cedula },
      });
      if (existingEncargado) {
        Object.assign(existingEncargado, encargadoLegalData);
        encargadoLegalEntity = await this.encargadoLegalRepository.save(existingEncargado);
      } else {
        encargadoLegalEntity = await this.encargadoLegalRepository.save(
          this.encargadoLegalRepository.create(encargadoLegalData)
        );
      }
    } else {
      encargadoLegalEntity = await this.encargadoLegalRepository.save(
        this.encargadoLegalRepository.create(encargadoLegalData)
      );
    }
    
    // 2. Buscar el Grado por su ID (según estudianteData.gradoId)
    const gradoEntity = await this.gradoRepository.findOne({ where: { id_grado: estudianteData.gradoId } });
    if (!gradoEntity) {
      throw new NotFoundException(`Grado con ID ${estudianteData.gradoId} no encontrado`);
    }
    
    // 3. Verificar si el estudiante ya existe usando la propiedad "cedula"
    let estudianteEntity: Estudiante;
    const existingStudent = await this.estudianteRepository.findOne({
      where: { cedula: estudianteData.cedula },
    });
    if (existingStudent) {
      // Actualiza los datos del estudiante existente y asigna el nuevo grado
      Object.assign(existingStudent, estudianteData);
      existingStudent.grado = gradoEntity;
      estudianteEntity = await this.estudianteRepository.save(existingStudent);
    } else {
      // Crear y guardar un nuevo estudiante
      estudianteEntity = await this.estudianteRepository.save(
        this.estudianteRepository.create({
          ...estudianteData,
          encargadoLegal: encargadoLegalEntity,
          grado: gradoEntity,
        })
      );
    }
    
    // 4. Verificar si ya existe una matrícula para este estudiante (sin considerar periodo)
    const existingMatricula = await this.matriculaRepository.findOne({
      where: { estudiante: { id_Estudiante: estudianteEntity.id_Estudiante } },
    });
    if (existingMatricula) {
      // Elimina la matrícula previa para evitar duplicados
      await this.matriculaRepository.remove(existingMatricula);
    }
    
    // 5. Generar la fecha actual en formato 'YYYY-MM-DD'
    const currentDate = new Date().toISOString().split('T')[0];
    
    // 6. Crear la nueva matrícula en estado Pendiente
    const matriculaEntity = this.matriculaRepository.create({
      fecha_creacion_Matricula: currentDate,
      fecha_actualizacion_Matricula: currentDate,
      estado_Matricula: EstadoMatricula.Pendiente,
      estudiante: estudianteEntity,
      encargadoLegal: encargadoLegalEntity,
    });
    return await this.matriculaRepository.save(matriculaEntity);
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
    // Buscar todas las matrículas con estado 'Aceptado' (AC) que no tengan usuario asignado al estudiante
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

        // Verificar que no exista ya un usuario asignado o registrado previamente para este correo
        if (student.usuario) {
          // Ya existe un usuario asociado, no se crea ni se envía correo
          continue;
        }
        const existingUser = await this.usersService.findUserByEmail(student.correo_estudiantil);
        if (existingUser) {
          // El estudiante ya tuvo un usuario registrado en un ciclo previo; por lo tanto, se omite enviar el correo
          continue;
        }

        // Si llega hasta acá, se procede a crear el usuario y enviar correo
        const provisionalPassword = this.generateProvisionalPassword();

        // Crear el usuario y asignarlo al estudiante existente
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
