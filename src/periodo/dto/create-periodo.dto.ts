import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreatePeriodoDto {
    @IsNotEmpty({ message: 'El nombre del periodo es obligatorio' })
    @IsString()
    nombre_Periodo: string;
}
