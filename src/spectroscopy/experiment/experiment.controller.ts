import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { isUUID } from 'class-validator';

@Controller('experiment')
export class ExperimentController {
  constructor(private readonly experimentService: ExperimentService) {}

  @Post()
  @FormDataRequest()
  create(@Body() createExperimentDto: CreateExperimentDto) {
    // console.log(createExperimentDto);
    return this.experimentService.create(createExperimentDto);
  }

  @Get()
  findAll() {
    return this.experimentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experimentService.findOne(isUUID(id) ? {id} : {name: id});
  }

  @Get('category/:id')
  findCategory(@Param('id') id: string) {
    console.log(id);
    
    return this.experimentService.findCategory(id);
  }

  @Patch(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateExperimentDto: UpdateExperimentDto) {
    return this.experimentService.update(isUUID(id) ? {id} : {name: id}, updateExperimentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experimentService.remove(isUUID(id) ? {id} : {name: id});
  }
}
