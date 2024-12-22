import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalExperimentInfo, CreateExperimentDto, UpdateDataExperimentDto } from './create-experiment.dto';

export class UpdateExperimentDto extends PartialType(UpdateDataExperimentDto) {}
