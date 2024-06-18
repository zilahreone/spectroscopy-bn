import { PartialType } from '@nestjs/swagger';
import { UpdateCreateExperimentDto } from './create-experiment.dto';

export class UpdateExperimentDto extends PartialType(UpdateCreateExperimentDto) {
}
