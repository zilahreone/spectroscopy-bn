import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalExperimentInfo, CreateExperimentDto } from './create-experiment.dto';

export class UpdateExperimentDto extends IntersectionType(CreateExperimentDto, AdditionalExperimentInfo) {}
