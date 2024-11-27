import { IntersectionType, PartialType } from '@nestjs/swagger';
import { FileDto, UpdateDataDto } from './create-sample.dto';

export class UpdateSampleDto extends IntersectionType(FileDto, UpdateDataDto) {}
