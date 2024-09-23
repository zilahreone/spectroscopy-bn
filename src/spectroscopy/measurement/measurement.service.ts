import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly repository: Repository<Measurement>,
  ) { }
  async create(createMeasurementDto: CreateMeasurementDto) {
    try {
      return await this.repository.save(createMeasurementDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { experiments: true, downloads: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateMeasurementDto: UpdateMeasurementDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateMeasurementDto);
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
