import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './Entities/matricula-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula])],
  controllers: [MatriculaController],
  providers: [MatriculaService]
})
export class MatriculaModule {}
