import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Put, HttpStatus } from '@nestjs/common';
import { EncargadoLegalService } from './encargado-legal.service';
import { CreateEncargadoLegalDto } from './dto/create-encargado-legal.dto';
import { EncargadoLegal } from './entities/encargado-legal.entity';
import { UpdateEncargadoLegalDto } from './dto/update-encargado-legal.dto';
//import { UpdateEncargadoLegalDto } from './dto/update-encargado-legal.dto';

@Controller('encargados_legales')
export class EncargadoLegalController {
  constructor(private readonly encargadoLegalService: EncargadoLegalService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEncargadoLegalDto: CreateEncargadoLegalDto): Promise<EncargadoLegal> {
    try {
      return await this.encargadoLegalService.create(createEncargadoLegalDto);
    } catch (error) {
      console.error("Error en el controlador al crear el Encargado Legal:", error);
      throw error;
    }
  }

  // @Get()
  // async findAll(): Promise<EncargadoLegal[]> {
  //   try {
  //     return await this.encargadoLegalService.findAll();
  //   } catch (error) {
  //     console.error("Error en el controlador al obtener todos los Encargados Legales:", error);
  //     throw error;
  //   }
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<EncargadoLegal> {
  //   try {
  //     return await this.encargadoLegalService.findOne(id);
  //   } catch (error) {
  //     console.error(`Error en el controlador al obtener el Encargado Legal con ID ${id}:`, error);
  //     throw error;
  //   }
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateEncargadoLegalDto: UpdateEncargadoLegalDto,
  // ): Promise<EncargadoLegal> {
  //   try {
  //     return await this.encargadoLegalService.update(id, updateEncargadoLegalDto);
  //   } catch (error) {
  //     console.error(`Error en el controlador al actualizar el Encargado Legal con ID ${id}:`, error);
  //     throw error;
  //   }
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('id') id: number): Promise<void> {
  //   try {
  //     await this.encargadoLegalService.remove(id);
  //   } catch (error) {
  //     console.error(`Error en el controlador al eliminar el Encargado Legal con ID ${id}:`, error);
  //     throw error;
  //   }
  // }
}