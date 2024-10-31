
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsReservaValida', async: false })
export class IsReservaValida implements ValidatorConstraintInterface {
  validate(fecha_Evento: Date, args: ValidationArguments) {
    const ahora = new Date();
    const diferencia = fecha_Evento.getTime() - ahora.getTime();
    const tresDias = 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos
    return diferencia >= tresDias;
  }

  defaultMessage(args: ValidationArguments) {
    return 'El evento debe ser reservado con al menos 3 días de anticipación';
  }
}
