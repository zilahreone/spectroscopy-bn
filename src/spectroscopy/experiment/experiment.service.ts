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

@Injectable()
export class ExperimentService {
  constructor(
    @InjectRepository(Experiment)
    private readonly repository: Repository<Experiment>,
    private readonly techniqueService: TechniqueService,
    private readonly measurementService: MeasurementService,
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly sampleService: SampleService,
  ) { }
  async create(createExperimentDto: CreateExperimentDto) {
    const technique = await this.techniqueService.findOne(createExperimentDto.technique_id);
    const measurement = await this.measurementService.findOne(createExperimentDto.measurement_id);
    const user = await this.userService.findOne(createExperimentDto.user_id);
    const organization = await this.organizationService.findOne(createExperimentDto.organization_id);
    const sample = await this.sampleService.findOne(createExperimentDto.sample_id);
    try {
      return await this.repository.save({...createExperimentDto, technique, measurement, user, organization, sample})
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
