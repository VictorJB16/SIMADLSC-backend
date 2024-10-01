import { IsNotEmpty, IsString } from "class-validator";

export class CreateMateriaDto {
    @IsNotEmpty()
    @IsString()
    nombre_Materia: string;
}
