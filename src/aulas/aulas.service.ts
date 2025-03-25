import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';

@Injectable()
export class AulasService {

  constructor(
    @InjectRepository(Aula) 
    private readonly aulaRepository: Repository<Aula>,
  ) {}

  async create(createAulaDto: CreateAulaDto): Promise<Aula> {

    const aula = this.aulaRepository.create(createAulaDto);
    return this.aulaRepository.save(aula);

  }

  async findAll(): Promise<Aula[]> {
    return this.aulaRepository.find();

  }

  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Aula> {
    const aula = await this.aulaRepository.findOne({ where: { id_aula: id } });
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
  }
    return aula;
  }
  //delete
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const aula = await this.aulaRepository.findOne({ where: { id_aula: id } });
    if (!aula) {
      throw new NotFoundException(`Aula con ID ${id} no encontrada`);
    }
    await this.aulaRepository.remove(aula);
  }
}
