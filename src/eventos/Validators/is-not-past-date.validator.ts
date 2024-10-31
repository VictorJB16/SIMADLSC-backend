// src/validators/is-not-past-date.validator.ts

import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'isNotPastDate', async: false })
  export class IsNotPastDateConstraint implements ValidatorConstraintInterface {
    validate(fecha: Date, args: ValidationArguments) {
      if (!(fecha instanceof Date)) {
        return false;
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Comparar solo la fecha, sin la hora
  
      const inputDate = new Date(fecha);
      inputDate.setHours(0, 0, 0, 0);
  
      return inputDate >= today;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'La fecha del evento no puede estar en el pasado.';
    }
  }
  
  // Decorador para usar en los DTOs
  export function IsNotPastDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNotPastDateConstraint,
      });
    };
  }
  