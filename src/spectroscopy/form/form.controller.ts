import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { isUUID } from 'class-validator';
import { Roles } from 'src/auth/roles.decorator';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @Roles(['admin'])
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(isUUID(id) ? {id} : {name: id});
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }
}
