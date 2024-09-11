import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechniqueService } from './technique.service';
import { CreateTechniqueDto } from './dto/create-technique.dto';
import { UpdateTechniqueDto } from './dto/update-technique.dto';

@Controller('technique')
export class TechniqueController {
  constructor(private readonly techniqueService: TechniqueService) {}

  @Post()
  create(@Body() createTechniqueDto: CreateTechniqueDto) {
    return this.techniqueService.create(createTechniqueDto);
  }

  @Get()
  findAll() {
    return this.techniqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechniqueDto: UpdateTechniqueDto) {
    return this.techniqueService.update(+id, updateTechniqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techniqueService.remove(+id);
  }
}
