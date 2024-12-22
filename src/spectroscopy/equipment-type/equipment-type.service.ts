import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentType } from './entities/equipment-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentTypeService {
  constructor(
    @InjectRepository(EquipmentType)
    private readonly repository: Repository<EquipmentType>,
  ) { }
  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    try {
      return await this.repository.save(createEquipmentTypeDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { instruments: { technique: { experiments: true } } } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateEquipmentTypeDto);
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
