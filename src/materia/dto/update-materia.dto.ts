import { PartialType } from '@nestjs/mapped-types';
import { CreateMateriaDto } from './create-materia.dto';
import { IsString } from 'class-validator';

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {

    @IsString()
    nombre_Materia: string
}
