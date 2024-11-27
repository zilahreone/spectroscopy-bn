import { IntersectionType } from '@nestjs/swagger';
import { AdditionalInstrumentInfo, CreateInstrumentDto } from './create-instrument.dto';

export class UpdateInstrumentDto extends IntersectionType(CreateInstrumentDto, AdditionalInstrumentInfo) {}
