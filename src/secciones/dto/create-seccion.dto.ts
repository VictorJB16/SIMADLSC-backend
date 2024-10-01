import { IsNotEmpty } from "class-validator";

export class CreateSeccionDto {
  @IsNotEmpty()
  nombre: string;
}