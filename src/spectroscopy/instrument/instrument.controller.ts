import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  @Roles(['admin'])
  create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentService.create(createInstrumentDto);
  }

  @Get()
  findAll() {
    return this.instrumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instrumentService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentService.update(id, updateInstrumentDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.instrumentService.remove(id);
  }
}
