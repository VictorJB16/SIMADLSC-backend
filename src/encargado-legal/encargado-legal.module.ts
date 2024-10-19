import { Module } from '@nestjs/common';
import { EncargadoLegalService } from './encargado-legal.service';
import { EncargadoLegalController } from './encargado-legal.controller';
import { EncargadoLegal } from './entities/encargado-legal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EncargadoLegal])],
  controllers: [EncargadoLegalController],
  providers: [EncargadoLegalService],
})
export class EncargadoLegalModule {}
