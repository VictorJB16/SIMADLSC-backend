import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { DirigidoAService } from './dirigido-a.service';
  import { CreateDirigidoADto } from './dto/create-dirigido-a.dto';
  import { UpdateDirigidoADto } from './dto/update-dirigido-a.dto';
  import { DirigidoA } from './entities/dirigido-a.entity';  
  
  @Controller('dirigido-a')
  export class DirigidoAController {
    constructor(private readonly dirigidoAService: DirigidoAService) {}
  
    @Post()
    create(@Body() createDirigidoADto: CreateDirigidoADto): Promise<DirigidoA> {
      return this.dirigidoAService.create(createDirigidoADto);
    }
  
    @Get()
    findAll(): Promise<DirigidoA[]> {
      return this.dirigidoAService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<DirigidoA> {
      return this.dirigidoAService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateDirigidoADto: UpdateDirigidoADto,
    ): Promise<DirigidoA> {
      return this.dirigidoAService.update(+id, updateDirigidoADto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.dirigidoAService.remove(+id);
    }
  }
  