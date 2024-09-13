import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
  ) {}

  // Obtener todas las asistencias
  async getAllAsistencias(): Promise<Asistencia[]> {
    return await this.asistenciaRepository.find();
  }

  // Buscar asistencia por id_estudiante
  async getAsistenciaByIdEstudiante(id_estudiante: number): Promise<Asistencia[]> {
    const asistencias = await this.asistenciaRepository.find({
      where: { id_estudiante },
    });

    if (asistencias.length === 0) {
      throw new NotFoundException(`No asistencias found for student with id ${id_estudiante}`);
    }

    return asistencias;
  }

  // Crear nueva asistencia
  async createAsistencia(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    const newAsistencia = this.asistenciaRepository.create({
      ...createAsistenciaDto,
      fecha: new Date(createAsistenciaDto.fecha), // Convertir la fecha si es necesario
    });

    return await this.asistenciaRepository.save(newAsistencia);
  }

  async updateAsistencia(
    id_estudiante: number,  // ID del estudiante desde la URL
    updateAsistenciaDto: UpdateAsistenciaDto
  ): Promise<Asistencia> {
    // Buscar la asistencia por id_estudiante
    const asistencia = await this.asistenciaRepository.findOne({
      where: { id_estudiante }, // Solo usamos el id_estudiante de la URL
    });
  
    if (!asistencia) {
      throw new NotFoundException(`Asistencia not found for student with id ${id_estudiante}`);
    }
  
    // Ignorar el id_estudiante que venga en el cuerpo, usando el que está en la URL
    const updatedAsistencia = this.asistenciaRepository.merge(asistencia, {
      ...updateAsistenciaDto,
      id_estudiante,  // Aseguramos que se mantenga el id_estudiante original
      fecha: new Date(updateAsistenciaDto.fecha), // Asegurar que la fecha se guarde correctamente
    });
  
    // Guardar los cambios en la base de datos
    return await this.asistenciaRepository.save(updatedAsistencia);
  }
  


  // Eliminar una asistencia por id_estudiante
  async deleteAsistencia(id_estudiante: number): Promise<{ message: string }> {
    const result = await this.asistenciaRepository.delete({ id_estudiante });

    if (result.affected === 0) {
      throw new NotFoundException(`Asistencia not found for student with id ${id_estudiante}`);
    }

    return { message: `Asistencia for student with id ${id_estudiante} deleted successfully` };
  }
}
