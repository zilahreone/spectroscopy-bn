import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { ChemicalService } from '../chemical/chemical.service';
// import { TechniqueService } from '../technique/technique.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    // private readonly chemicalService: ChemicalService,
    // private readonly techniqueService: TechniqueService
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    // const chemical = await this.chemicalService.findOne({id: createCategoryDto.chemicalId})
    // const technique = await this.techniqueService.findOne(createCategoryDto.techniqueId)
    try {
      return await this.repository.save({...createCategoryDto})
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { samples: true } })
  }

  async findOne(id: { name: string } | { id: string}) {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: {}});
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }
  
  async findOneRelation(id: { name: string } | { id: string}) {
    try {
      return (await this.repository.findOneOrFail({ where: id, relations: { samples: { experiments: true } } })).samples.map(sam => (sam.experiments.map(exp => ({ id: exp.id, name: exp.name }))));
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne({id});
    // const chemical = await this.chemicalService.findOne({id: updateCategoryDto.chemicalId})
    try {
      return await this.repository.update(id, {...updateCategoryDto});
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne({id});
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}
