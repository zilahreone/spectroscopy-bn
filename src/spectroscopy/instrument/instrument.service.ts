import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrument } from './entities/instrument.entity';
import { TechniqueService } from '../technique/technique.service';
import { EquipmentTypeService } from '../equipment-type/equipment-type.service';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Injectable()
export class InstrumentService {
   constructor(
    @InjectRepository(Instrument)
    private readonly repository: Repository<Instrument>,
    private readonly techniqueService: TechniqueService,
    private readonly equipmentTypeService: EquipmentTypeService,
  ) { }
  async create(createInstrumentDto: CreateInstrumentDto) {
    const technique = await this.techniqueService.findOne(createInstrumentDto.techniqueId)
    const equipmentType = await this.equipmentTypeService.findOne(createInstrumentDto.equipmentTypeId)
    try {
      return await this.repository.save({...createInstrumentDto, technique, equipmentType})
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { technique: true, equipmentType: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateInstrumentDto: UpdateInstrumentDto) {
    await this.findOne(id);
    const technique = await this.techniqueService.findOne(updateInstrumentDto.techniqueId)
    const equipmentType = await this.equipmentTypeService.findOne(updateInstrumentDto.equipmentTypeId)
    try {
      return await this.repository.update(id, {...updateInstrumentDto, technique, equipmentType});
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
