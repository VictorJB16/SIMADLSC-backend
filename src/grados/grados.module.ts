import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grado } from './entities/grados-entity';
import { GradosService } from './grados.service';
import { GradosController } from './grados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grado])],
  controllers: [GradosController],
  providers: [GradosService],
})
export class GradosModule {}
