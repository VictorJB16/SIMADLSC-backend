import { Module } from '@nestjs/common';
import { HorariosController } from './horario.controller';
import { HorariosService } from './horario.service';

@Module({
  controllers: [HorariosController],
  providers: [HorariosService],
})
export class HorarioModule {}
