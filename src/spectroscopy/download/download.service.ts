import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { Download } from './entities/download.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Download)
    private readonly repository: Repository<Download>,
  ) { }
  async create(createDownloadDto: CreateDownloadDto) {
    try {
      return await this.repository.save(createDownloadDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  findAll() {
    return `This action returns all download`;
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
      return await this.repository.delete({ id: id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}
