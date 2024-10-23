import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEncargadoLegalDto } from './dto/create-encargado-legal.dto';
//import { UpdateEncargadoLegalDto } from './dto/update-encargado-legal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EncargadoLegal } from './entities/encargado-legal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EncargadoLegalService {
  constructor(
    @InjectRepository(EncargadoLegal)
    private readonly encargadoLegalRepository: Repository<EncargadoLegal>,
  ) {}

  async create(createEncargadoLegalDto: CreateEncargadoLegalDto): Promise<EncargadoLegal> {
   const encargadoLegal = this.encargadoLegalRepository.create(createEncargadoLegalDto);
   return await this.encargadoLegalRepository.save(encargadoLegal);
  }

  // async findAll(): Promise<EncargadoLegal[]> {
  //   try {
  //     return await this.encargadoLegalRepository.find();
  //   } catch (error) {
  //     console.error("Error al obtener todos los Encargados Legales:", error);
  //     throw new InternalServerErrorException('Ocurrió un error al obtener los Encargados Legales');
  //   }
  // }

  // async findOne(id: number): Promise<EncargadoLegal> {
  //   try {
  //     const encargadoLegal = await this.encargadoLegalRepository.findOne({ where: { id_encargado_legal: id } });
  //     if (!encargadoLegal) {
  //       throw new NotFoundException(`Encargado Legal con ID ${id} no encontrado`);
  //     }
  //     return encargadoLegal;
  //   } catch (error) {
  //     console.error(`Error al obtener el Encargado Legal con ID ${id}:`, error);
  //     throw new InternalServerErrorException('Ocurrió un error al obtener el Encargado Legal');
  //   }
  // }

  // async update(id: number, updateEncargadoLegalDto: UpdateEncargadoLegalDto): Promise<EncargadoLegal> {
  //   try {
  //     const encargadoLegal = await this.encargadoLegalRepository.preload({
  //       id_encargado_legal: id,
  //       ...updateEncargadoLegalDto,
  //     });
  //     if (!encargadoLegal) {
  //       throw new NotFoundException(`Encargado Legal con ID ${id} no encontrado`);
  //     }
  //     return await this.encargadoLegalRepository.save(encargadoLegal);
  //   } catch (error) {
  //     console.error(`Error al actualizar el Encargado Legal con ID ${id}:`, error);
  //     throw new InternalServerErrorException('Ocurrió un error al actualizar el Encargado Legal');
  //   }
  // }

  // async remove(id: number): Promise<void> {
  //   try {
  //     const encargadoLegal = await this.findOne(id);
  //     await this.encargadoLegalRepository.remove(encargadoLegal);
  //   } catch (error) {
  //     console.error(`Error al eliminar el Encargado Legal con ID ${id}:`, error);
  //     throw new InternalServerErrorException('Ocurrió un error al eliminar el Encargado Legal');
  //   }
  // }
}