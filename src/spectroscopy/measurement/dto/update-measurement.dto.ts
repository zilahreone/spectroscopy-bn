import { IntersectionType, PartialType } from '@nestjs/swagger';
import { FileDto, UpdateDataDto } from './create-measurement.dto';

export class UpdateMeasurementDto extends IntersectionType(FileDto, UpdateDataDto) {}
