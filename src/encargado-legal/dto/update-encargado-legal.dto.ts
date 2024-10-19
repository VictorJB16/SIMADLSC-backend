import { PartialType } from '@nestjs/mapped-types';
import { CreateEncargadoLegalDto } from './create-encargado-legal.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateEncargadoLegalDto extends PartialType(CreateEncargadoLegalDto) {

    @IsNotEmpty()
@IsString()
direccion: string;


@IsNotEmpty()
@IsNumber()
telefono_celular:number;

@IsNotEmpty()
@IsString()
habitacion:string;

@IsNotEmpty()
@IsString()
correo:string;
}
