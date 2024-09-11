import { IntersectionType } from '@nestjs/swagger';
import { DataUpdate, FileUpdate } from './create-experiment.dto';

export class UpdateExperimentDto extends IntersectionType(
  FileUpdate,
  DataUpdate
  ) {}
