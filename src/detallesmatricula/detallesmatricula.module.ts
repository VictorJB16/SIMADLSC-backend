import { Module } from '@nestjs/common';
import { DetallesmatriculaController } from './detallesmatricula.controller';
import { DetallesmatriculaService } from './detallesmatricula.service';

@Module({
  controllers: [DetallesmatriculaController],
  providers: [DetallesmatriculaService]
})
export class DetallesmatriculaModule {}
