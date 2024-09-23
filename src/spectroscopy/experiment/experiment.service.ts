import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(Experiment)
    private readonly repository: Repository<Experiment>,
  ) { }
  async create(createExperimentDto: CreateExperimentDto) {
    try {
      return await this.repository.save(createExperimentDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return `This action returns all experiment`;
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateExperimentDto: UpdateExperimentDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateExperimentDto);
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
