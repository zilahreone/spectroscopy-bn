import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalMeasurementInfo, CreateMeasurementDto } from './create-measurement.dto';

export class UpdateMeasurementDto extends IntersectionType(CreateMeasurementDto, AdditionalMeasurementInfo) {}
