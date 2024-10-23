import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Controller('periodos')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Get()
  async findAll() {
    return await this.periodoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.periodoService.findOne(+id);
  }

  @Post()
  async create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return await this.periodoService.create(createPeriodoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePeriodoDto: UpdatePeriodoDto,
  ) {
    return await this.periodoService.update(+id, updatePeriodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.periodoService.remove(+id);
  }
}
