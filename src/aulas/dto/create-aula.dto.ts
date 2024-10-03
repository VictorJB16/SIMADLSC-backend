import { IsNotEmpty, IsString } from "class-validator";

export class CreateAulaDto {

    @IsNotEmpty()
    @IsString()
    nombre_Aula: string;
}
