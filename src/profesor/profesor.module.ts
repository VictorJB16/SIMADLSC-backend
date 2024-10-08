import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Horario } from 'src/horario/entities/horario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor,Horario]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
