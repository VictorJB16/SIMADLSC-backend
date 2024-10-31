// src/validators/is-not-overlapping.validator.ts

import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Eventos } from '../entities/eventos.entity';
  import { Repository } from 'typeorm';
  
  @ValidatorConstraint({ name: 'isNotOverlapping', async: true })
  @Injectable()
  export class IsNotOverlappingConstraint implements ValidatorConstraintInterface {
    constructor(
      @InjectRepository(Eventos)
      private readonly eventosRepository: Repository<Eventos>,
    ) {}
  
    async validate(_: any, args: ValidationArguments) {
      const object = args.object as any;
  
      const id_ubicacion = object.id_ubicacion;
      const fecha_Evento = object.fecha_Evento;
      const hora_inicio_Evento = object.hora_inicio_Evento;
      const hora_fin_Evento = object.hora_fin_Evento;
  
      // Convertir las horas a formato 'HH:MM:SS' para asegurar consistencia
      const startTime = hora_inicio_Evento;
      const endTime = hora_fin_Evento;
  
      // Usamos QueryBuilder para verificar solapamiento
      const overlappingEvent = await this.eventosRepository
        .createQueryBuilder('evento')
        .where('evento.id_ubicacion = :id_ubicacion', { id_ubicacion })
        .andWhere('evento.fecha_Evento = :fecha_Evento', { fecha_Evento })
        .andWhere(
          '(evento.hora_inicio_Evento < :hora_fin_Evento AND evento.hora_fin_Evento > :hora_inicio_Evento)',
          { hora_inicio_Evento: endTime, hora_fin_Evento: startTime },
        )
        .getOne();
  
      return !overlappingEvent;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'La ubicación está ocupada en el horario especificado.';
    }
  }
  
  // Decorador para usar en los DTOs
  export function IsNotOverlapping(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNotOverlappingConstraint,
      });
    };
  }
  