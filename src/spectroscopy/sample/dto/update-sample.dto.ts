import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalSampleInfo, CreateSampleDto } from './create-sample.dto';

export class UpdateSampleDto extends IntersectionType(CreateSampleDto, AdditionalSampleInfo) {}
