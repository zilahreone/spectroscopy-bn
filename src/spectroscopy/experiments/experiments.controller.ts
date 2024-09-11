import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, StreamableFile, Req, RawBodyRequest, Header } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { UploadFiles } from 'src/upload-files.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { FormDataRequest, MemoryStoredFile, StoredFile } from 'nestjs-form-data';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) { }

  @Post()
  // @UploadFiles()
  @FormDataRequest()
  create(@Body() createExperimentDto: CreateExperimentDto) {
    // console.log(JSON.stringify(createExperimentDto.data));
    // console.log(req.formData);
    // return createExperimentDto;
    return this.experimentsService.create(createExperimentDto);
  }

  @Put(':id')
  // @UploadFiles()
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateExperimentDto: UpdateExperimentDto) {
    return this.experimentsService.update(id, updateExperimentDto);
  }

  @Get('attachment/:id/:name')
  getAttachment(@Param() param: any) {
    return this.experimentsService.findAttachment(param)
  }

  @Get('file/:id/:name')
  getFile(@Param() param: any) {
    console.log(param);
    return this.experimentsService.findFile(param)
  }

  @Get('all')
  findAllWithoutId() {
    return this.experimentsService.findAllWithoutId();
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
    return this.experimentsService.remove(id);
  }
}
