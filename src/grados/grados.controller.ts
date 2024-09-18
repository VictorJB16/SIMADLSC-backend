import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
