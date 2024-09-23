import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { Download } from './entities/download.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementService } from '../measurement/measurement.service';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Download)
    private readonly repository: Repository<Download>,
    private readonly measurementService: MeasurementService,
  ) { }
  async create(createDownloadDto: CreateDownloadDto) {
    const getMeasurement = await this.measurementService.findOne('eaef94ee-dd62-4a33-863e-470a6743e051');
    return await this.repository.save({ ...createDownloadDto, measurement: getMeasurement })
  }

  async findAll() {
    return await this.repository.find({ relations: { measurement: true } });
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateDownloadDto: UpdateDownloadDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateDownloadDto);
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
