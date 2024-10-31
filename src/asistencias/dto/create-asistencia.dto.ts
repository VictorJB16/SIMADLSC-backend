import { IsDateString, IsEnum, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { AsistenciaStatus } from "../entities/asistencia-status.enum";
import { CreateJustificacionAusenciaDto } from "src/justificacion_ausencia/dto/create-justificacion_ausencia.dto";

export class CreateAsistenciaDto {

    @IsDateString()
    @IsNotEmpty( )
    fecha: string;

    @IsEnum(AsistenciaStatus)
    @IsNotEmpty( )
    estado: AsistenciaStatus;

    @IsNotEmpty( )
    id_Estudiante: number;
    
    @IsNotEmpty( )
    id_Materia: number;

    @IsNotEmpty( )
    id_grado: number;

    @IsNumber()
    @IsNotEmpty()
    id_Seccion: number;

    @IsNumber()
    @IsNotEmpty()
    id_Profesor: number;

    @IsNumber()
    @IsNotEmpty()
    id_Periodo: number;

    // Justificacién solo es requerida si el estado es 'J'
    @ValidateIf(o => o.estado ===
    AsistenciaStatus.JUSTIFICADO)
    justificacionAusencia: CreateJustificacionAusenciaDto;
}
