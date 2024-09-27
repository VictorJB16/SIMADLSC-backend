import { IsNotEmpty } from "class-validator";

export class CreateGradoDto {
  @IsNotEmpty()
   nivel: string;
}
  