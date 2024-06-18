import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, StreamableFile } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { UploadFiles } from 'src/upload-files.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { FormDataRequest, MemoryStoredFile, StoredFile } from 'nestjs-form-data';
import { createReadStream, createWriteStream, readdir, writeFile, writeFileSync } from 'fs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) { }

  @Post()
  // @UploadFiles()
  @FormDataRequest()
  create(@Body() createExperimentDto: CreateExperimentDto) {
    console.log(createExperimentDto.files[0]);
    
    // const isBiffeer = Buffer.isBuffer(createExperimentDto.files[0])
    
    // writeFileSync(`CDN/attachments/${createExperimentDto.files[0].originalName}`, Buffer.from(createExperimentDto.files[0]))
    
    // return this.experimentsService.create(createExperimentDto);
  }

  @Put(':id')
  // @UploadFiles()
  update(@Param('id') id: string, @Body() updateExperimentDto: UpdateExperimentDto) {
    console.log(updateExperimentDto);
    // return this.experimentsService.update(id, updateExperimentDto);
  }

  @Get()
  // @UseGuards(AuthGuard)
  findAll() {
    return this.experimentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experimentsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExperimentDto: UpdateExperimentDto) {
  //   return this.experimentsService.update(+id, updateExperimentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experimentsService.remove(+id);
  }
}
