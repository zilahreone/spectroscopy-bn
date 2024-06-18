import { Injectable } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
  ) { }

  create(createExperimentDto: CreateExperimentDto) {
    // console.log(createExperimentDto.data);
    // createExperimentDto.data = {
    //   ...createExperimentDto.data,
    //   created_by: {
    //     id: 'sdfsdfsdfs-sdfsdf-rsdfgsd',
    //     name: 'wissarut'
    //   }
    // }
    // return this.experimentRepository.save(createExperimentDto.data);
  }

  findAll() {
    return this.experimentRepository.find({
      where: {
      }
    });
  }

  findOne(id: string) {
    return this.experimentRepository.findOneBy({
      id: id,
    });
  }

  update(id: string, updateExperimentDto: UpdateExperimentDto) {
    console.log(id, updateExperimentDto);
    // return this.experimentRepository.save(updateExperimentDto.data);
  }

  remove(id: number) {
    return `This action removes a #${id} experiment`;
  }
}
