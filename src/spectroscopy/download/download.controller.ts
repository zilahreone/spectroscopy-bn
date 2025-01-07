import { Controller, Get, Post, Body, Patch, Param, Delete, Header } from '@nestjs/common';
import { DownloadService } from './download.service';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { MeasurementService } from '../measurement/measurement.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly downloadService: DownloadService,
  ) {}

  @Post()
  create(@Body() createDownloadDto: CreateDownloadDto) {
    // console.log(createDownloadDto);
    return this.downloadService.create(createDownloadDto);
  }

  @Get()
  findAll() {
    return this.downloadService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.downloadService.findOne(id);
  }

  @Get('experiment/:experimentId')
  streamZip(@Param('experimentId') experimentId: string) {
    // console.log(experimentId);
    return this.downloadService.findExperiment(experimentId);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateDownloadDto: UpdateDownloadDto) {
    return this.downloadService.update(id, updateDownloadDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.downloadService.remove(id);
  }
}
