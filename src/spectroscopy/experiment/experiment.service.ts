import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { Repository } from 'typeorm';
import { TechniqueService } from '../technique/technique.service';
import { MeasurementService } from '../measurement/measurement.service';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../organization/organization.service';
import { SampleService } from '../sample/sample.service';
import { InstrumentService } from 'src/spectroscopy/instrument/instrument.service';
import { EquipmentTypeService } from '../equipment-type/equipment-type.service';

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(Experiment)
    private readonly repository: Repository<Experiment>,
    private readonly techniqueService: TechniqueService,
    private readonly equipmentTypeService: EquipmentTypeService,
    private readonly instrumentService: InstrumentService,
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly sampleService: SampleService,
  ) { }
  async create(createExperimentDto: CreateExperimentDto) {
    const technique = await this.techniqueService.findOne(createExperimentDto.data.techniqueId);
    const equipmentType = await this.equipmentTypeService.findOne(createExperimentDto.data.equipmentId);
    const instrument = await this.instrumentService.findOne(createExperimentDto.data.instrumentId);
    const user = await this.userService.findOne(createExperimentDto.data.userId);
    const organization = await this.organizationService.findOne({ id: createExperimentDto.data.organizationId });
    const sample = await this.sampleService.findOne({ id: createExperimentDto.data.sampleId });
    try {
      return await this.repository.save({ ...createExperimentDto.data, technique, equipmentType, instrument, user, organization, sample })
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { sample: true, organization: true, user: true, measurements: true, technique: true, equipmentType: true, instrument: true} })
  }

  async findOne(id: { name: string } | { id: string }) {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { sample: { chemical: true, category: true }, organization: true, user: true, measurements: true, technique: true, equipmentType: true, instrument: true } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }
  
  async findCategory(name: string) {
    return (await this.repository.find({ relations: { sample: { category: true }, measurements: false } })).filter(exp => (exp.sample.category.name === name));
  }

  async update(id: { name: string } | { id: string }, updateExperimentDto: UpdateExperimentDto) {
    // console.log(id);
    const find = await this.findOne(id);
    const technique = await this.techniqueService.findOne(updateExperimentDto.data.techniqueId);
    const equipmentType = await this.equipmentTypeService.findOne(updateExperimentDto.data.equipmentId);
    const instrument = await this.instrumentService.findOne(updateExperimentDto.data.instrumentId);
    const user = await this.userService.findOne(updateExperimentDto.data.userId);
    const organization = await this.organizationService.findOne({ id: updateExperimentDto.data.organizationId });
    const sample = await this.sampleService.findOne({ id: updateExperimentDto.data.sampleId });
    try {
      // console.log(find);
      // console.log('=================');
      const update = Object.keys(find).reduce((prev, curr) => {
        if (!['createAt', 'updateAt', 'technique', 'equipmentType', 'instrument', 'user', 'organization', 'sample'].includes(curr)) {
          prev[curr] = updateExperimentDto.data[curr]
        }
        return prev
      }, {
        technique,
        equipmentType,
        instrument,
        user,
        organization,
        sample
      })
      // console.log(updateExperimentDto.data);
      return await this.repository.update(id, update);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: { name: string } | { id: string }) {
    await this.findOne(id);
    try {
      return await this.repository.delete(id)
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}
