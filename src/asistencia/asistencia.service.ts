import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Injectable()
export class AsistenciaService {
  private asistencias = [];

  // Obtener todas las asistencias
  getAllAsistencias() {
    return this.asistencias;
  }

  // Buscar asistencia por id_estudiante
  getAsistenciaByIdEstudiante(id_estudiante: number) {
    const asistencias = this.asistencias.filter(a => a.id_estudiante === id_estudiante);

    if (asistencias.length === 0) {
      throw new NotFoundException(`No asistencias found for student with id ${id_estudiante}`);
    }

    return asistencias;
  }

  // Crear nueva asistencia
  createAsistencia(createAsistenciaDto: CreateAsistenciaDto) {
    const newAsistencia = {
      ...createAsistenciaDto,
      fecha: new Date(createAsistenciaDto.fecha) // Convertir la fecha a un objeto Date
    };
    this.asistencias.push(newAsistencia); // Guardar en el array
    return newAsistencia;
  }

  // Actualizar una asistencia existente
  updateAsistencia(id_estudiante: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    const index = this.asistencias.findIndex(a => a.id_estudiante === id_estudiante);

    if (index === -1) {
      throw new NotFoundException(`Asistencia not found for student with id ${id_estudiante}`);
    }

    // Actualizar la asistencia existente con los datos proporcionados
    this.asistencias[index] = {
      ...this.asistencias[index],
      ...updateAsistenciaDto, // Actualizar con los nuevos datos
      fecha: new Date(updateAsistenciaDto.fecha) // Asegurar que la fecha se guarde correctamente
    };

    return this.asistencias[index];
  }



 // Eliminar una asistencia por id_estudiante
 deleteAsistencia(id_estudiante: number) {
  const index = this.asistencias.findIndex(a => a.id_estudiante === id_estudiante);

  if (index === -1) {
    throw new NotFoundException(`Asistencia not found for student with id ${id_estudiante}`);
  }

  this.asistencias.splice(index, 1); // Eliminar la asistencia del array

  return { message: `Asistencia for student with id ${id_estudiante} deleted successfully` };
}
}
