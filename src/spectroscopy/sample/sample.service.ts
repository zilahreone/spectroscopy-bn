import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';
import { MaterialService } from '../material/material.service';
import { CategoryService } from '../category/category.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly repository: Repository<Sample>,
    private readonly materialService: MaterialService,
    private readonly categoryService: CategoryService,
    private readonly organizationService: OrganizationService,
  ) { }
  async create(createSampleDto: CreateSampleDto) {
    const material = await this.materialService.findOne(createSampleDto.material_id)
    const category = await this.categoryService.findOne(createSampleDto.category_id)
    const organization = await this.organizationService.findOne(createSampleDto.organization_id)
    try {
      return await this.repository.save({...createSampleDto, material: material, category: category, organization: organization})
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return `This action returns all sample`;
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
      return await this.repository.update(id, updateSampleDto);
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
