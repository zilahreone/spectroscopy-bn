import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { isUUID } from 'class-validator';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @FormDataRequest()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(isUUID(id) ? {id} : {name: id});
  }

  @Get(':id/:filename')
  findOneFilename(@Param() params: { id: string, filename: string }) {
    const { id, filename } = params
    return this.sampleService.streamFile(isUUID(id) ? {id} : {name: id}, filename)
    // return this.sampleService.findOne(isUUID(id) ? {id} : {name: id});
  }

  @Patch(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(isUUID(id) ? {id} : {name: id}, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleService.remove(isUUID(id) ? {id} : {name: id});
  }
}
