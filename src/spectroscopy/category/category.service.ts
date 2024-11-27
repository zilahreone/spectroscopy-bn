import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChemicalService } from '../chemical/chemical.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly chemicalService: ChemicalService
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const chemical = await this.chemicalService.findOne(createCategoryDto.chemicalId)
    try {
      return await this.repository.save({...createCategoryDto, chemical})
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ name: id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateCategoryDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      console.log();
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}
