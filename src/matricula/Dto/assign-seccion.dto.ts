import { IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class AssignSeccionDto {
  @IsNumber()
  seccionId: number;

  @IsArray()
  @ArrayNotEmpty()
  matriculaIds: number[];
}