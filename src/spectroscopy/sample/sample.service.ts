import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';
import { ChemicalService } from '../chemical/chemical.service';
import { CategoryService } from '../category/category.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly repository: Repository<Sample>,
    private readonly chemicalService: ChemicalService,
    private readonly categoryService: CategoryService,
    private readonly organizationService: OrganizationService,
  ) { }

  async create(createSampleDto: CreateSampleDto) {
    const material = await this.chemicalService.findOne(createSampleDto.data.chemicalName)
    const category = await this.categoryService.findOne(createSampleDto.data.categoryId)
    const organization = await this.organizationService.findOne(createSampleDto.data.organizationId)
    try {
      return await this.repository.save({...createSampleDto.data, material: material, category: category, organization: organization})
      // return await this.repository.save(createSampleDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { experiments: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateSampleDto: UpdateSampleDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateSampleDto.data);
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
