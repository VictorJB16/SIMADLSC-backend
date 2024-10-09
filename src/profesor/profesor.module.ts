import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Materia } from 'src/materia/entities/materia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor,Materia]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
