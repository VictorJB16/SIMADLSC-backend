export class CreateHorarioDto {
  usuarioId: number;
  profesorId: number;
  estudianteId: number;
  materiaId: number;
  gradoId: number;
  seccionId: number;
  dia_semana_Horario: string;
  hora_inicio_Horario: string;
  hora_fin_Horario: string;
}
