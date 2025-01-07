import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { isUUID } from 'class-validator';
import { Roles } from 'src/auth/roles.decorator';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  @Roles(['admin'])
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
  }

  @Patch(':id')
  @Roles(['admin'])
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(isUUID(id) ? {id} : {name: id}, updateSampleDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.sampleService.remove(isUUID(id) ? {id} : {name: id});
  }
}
