import { Controller, Get, Post, Body, Patch, Param, Delete, Header, UseInterceptors, Query } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { isUUID } from 'class-validator';
import { LoggingInterceptor } from './logging.interceptor';
import { ParamDecodePipe } from './param-decode.pipe';
import { Roles } from 'src/auth/roles.decorator';

// @UseInterceptors(LoggingInterceptor)
@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  @FormDataRequest()
  create(@Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementService.create(createMeasurementDto);
  }

  @Get()
  findAll() {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementService.findOne(isUUID(id) ? {id} : {name: id});
  }

  @Get(':id/:filename')
  findOneFilename(@Param() params: { id: string, filename: string }) {
    const { id, filename } = params
    return this.measurementService.streamFile(isUUID(id) ? {id} : {name: id}, filename)
  }

  @Patch(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateMeasurementDto: UpdateMeasurementDto) {
    return this.measurementService.update(isUUID(id) ? {id} : {name: id}, updateMeasurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementService.remove(isUUID(id) ? {id} : {name: id});
  }
}
