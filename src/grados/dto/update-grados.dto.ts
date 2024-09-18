import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateGradosDto {


  @IsOptional()
  @IsString()
   nivel: string;
  
}