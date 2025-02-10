import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { isUUID } from 'class-validator';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Roles(['admin'])
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('all')
  findAllWithRelations() {
    return this.categoryService.findAllRelations();
  }

  // @Get('file-example')
  // getFile() {
  //   return  this.categoryService.streamFile()
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(isUUID(id) ? { id } : { name: id });
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }


}
