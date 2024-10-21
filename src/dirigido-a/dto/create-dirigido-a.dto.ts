import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirigidoADto {
 


  @IsString()
  @IsNotEmpty()
  nombre: string;
}
