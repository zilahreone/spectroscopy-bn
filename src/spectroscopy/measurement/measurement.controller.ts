import { Controller, Get, Post, Body, Patch, Param, Delete, Header } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  create(@Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementService.create(createMeasurementDto);
  }

  @Get()
  findAll() {
    return this.measurementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeasurementDto: UpdateMeasurementDto) {
    return this.measurementService.update(id, updateMeasurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementService.remove(id);
  }

  @Get(':id/file/:name')
  getFile(@Param() params: { id: string, name: string }) {
    console.log(params.id, params.name);
    
    // type Params = {
    //   id: string,
    //   name: string
    // }
    // const { id, name } = params as object as Params
    // return this.measurementService.findFile(id, name)
  }  
}
