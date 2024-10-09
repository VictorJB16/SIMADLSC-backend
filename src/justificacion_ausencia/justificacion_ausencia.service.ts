import { Injectable } from '@nestjs/common';
import { CreateJustificacionAusenciaDto } from './dto/create-justificacion_ausencia.dto';
import { UpdateJustificacionAusenciaDto } from './dto/update-justificacion_ausencia.dto';

@Injectable()
export class JustificacionAusenciaService {
  create(createJustificacionAusenciaDto: CreateJustificacionAusenciaDto) {
    return 'This action adds a new justificacionAusencia';
  }

  findAll() {
    return `This action returns all justificacionAusencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} justificacionAusencia`;
  }

  update(id: number, updateJustificacionAusenciaDto: UpdateJustificacionAusenciaDto) {
    return `This action updates a #${id} justificacionAusencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} justificacionAusencia`;
  }
}
