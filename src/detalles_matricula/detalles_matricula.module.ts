import { Module } from '@nestjs/common';
import { DetallesMatriculaController } from './detalles_matricula.controller';
import { DetallesMatriculaService } from './detalles_matricula.service';

@Module({
  controllers: [DetallesMatriculaController],
  providers: [DetallesMatriculaService]
})
export class DetallesMatriculaModule {}
