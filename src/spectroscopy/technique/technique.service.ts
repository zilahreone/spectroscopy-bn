import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateTechniqueDto } from './dto/create-technique.dto';
import { UpdateTechniqueDto } from './dto/update-technique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Technique } from './entities/technique.entity';
import { Repository } from 'typeorm';
// import { CategoryService } from '../category/category.service';

@Injectable()
export class TechniqueService {
  constructor(
    @InjectRepository(Technique)
    private readonly repository: Repository<Technique>,
    // private readonly categoryService: CategoryService,
  ) { }
  async create(createTechniqueDto: CreateTechniqueDto) {
    // const category = await this.categoryService.findOne(createTechniqueDto.categoryName)
    try {
      return await this.repository.save({...createTechniqueDto})
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { instruments: { equipmentType: true }, experiments: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({id});
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateTechniqueDto: UpdateTechniqueDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateTechniqueDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}
