import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly repository: Repository<Sample>,
  ) { }
  async create(createSampleDto: CreateSampleDto) {
    try {
      return await this.repository.save(createSampleDto)
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
