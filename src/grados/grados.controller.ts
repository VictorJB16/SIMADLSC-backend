import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { GradosService } from './grados.service';
import { CreateGradoDto } from './dto/create-grados.dto';

@Controller('grados')
export class GradosController {
  constructor(private readonly gradosService: GradosService) {}

  @Get()
  async findAll() {
    return this.gradosService.findAll();
  }
  

  @Post()
  async create(@Body() createGradoDto: CreateGradoDto) {
    return this.gradosService.create(createGradoDto);
  }
//dame el delete 
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.gradosService.delete(id);
  }
}