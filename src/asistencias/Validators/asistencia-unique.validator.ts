// src/asistencias/validators/asistencia-unique.validator.ts

import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Asistencia } from '../entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsAsistenciaUnique', async: true })
@Injectable()
export class IsAsistenciaUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ) {}

  async validate(_: any, args: ValidationArguments) {
    const dto = args.object as any; // Accedemos al objeto completo de la clase
    const {
      fecha,
      id_Materia,
      id_Profesor,
      id_grado,
      id_Seccion,
      id_Periodo,
      id_Estudiante,
    } = dto;

    const count = await this.asistenciaRepository.count({
      where: {
        fecha,
        id_Materia: { id_Materia },
        id_Profesor: { id_Profesor },
        id_grado: { id_grado },
        id_Seccion: { id_Seccion },
        id_Periodo: { id_Periodo },
        id_Estudiante: { id_Estudiante },
      },
    });

    return count === 0; // Retorna `true` si no hay duplicados
  }

  defaultMessage(args: ValidationArguments) {
    return 'Ya existe una asistencia registrada para este día con el mismo estudiante, materia, profesor, grado, sección y período.';
  }
}

export function IsAsistenciaUnique(validationOptions?: ValidationOptions) {
  return function (constructor: Function) {
    registerDecorator({
      name: 'IsAsistenciaUnique',
      target: constructor,
      propertyName: '', // No se aplica a una propiedad específica
      options: validationOptions,
      validator: IsAsistenciaUniqueConstraint,
    });
  };
}
