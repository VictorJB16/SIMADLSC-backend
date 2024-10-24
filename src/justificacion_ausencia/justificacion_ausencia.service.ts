import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JustificacionAusencia } from './entities/justificacion_ausencia.entity';
import { Asistencia } from 'src/asistencias/entities/asistencia.entity';
import { AsistenciaStatus } from '../asistencias/entities/asistencia-status.enum';
import { CreateJustificacionAusenciaDto } from './dto/create-justificacion_ausencia.dto';

@Injectable()
export class JustificacionAusenciaService {
  constructor(
    @InjectRepository(JustificacionAusencia)
    private justificacionRepository: Repository<JustificacionAusencia>,
    
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
  ) {}

  async justificarAsistencia(id: number, createJustificacionDto: CreateJustificacionAusenciaDto): Promise<JustificacionAusencia> {
    const asistencia = await this.asistenciaRepository.findOne({ where: { asistencia_id: id } });
    if (!asistencia) {
      throw new NotFoundException(`Asistencia con ID ${id} no encontrada`);
    }

    const justificacion = this.justificacionRepository.create({
      ...createJustificacionDto,
      fecha: new Date(), 
      asistencia, 
    });

    
    await this.justificacionRepository.save(justificacion);

    
    asistencia.estado = AsistenciaStatus.JUSTIFICADO;
    asistencia.justificacionAusencia = justificacion; 
    await this.asistenciaRepository.save(asistencia);

    return justificacion;
  }
  
  async obtenerJustificaciones(): Promise<JustificacionAusencia[]> {
    return this.justificacionRepository.find({ relations: ['asistencia'] });
  }


  async deleteJustificacion(id: number): Promise<void> {
    const justificacion = await this.justificacionRepository.findOne({ where: { justificacion_ausencia_id: id } });
    if (!justificacion) {
      throw new NotFoundException(`Justificación con ID ${id} no encontrada`);
    }
    await this.justificacionRepository.remove(justificacion);
  }
}

