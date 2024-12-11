import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalFormInfo, CreateFormDto } from './create-form.dto';

export class UpdateFormDto extends IntersectionType(CreateFormDto, AdditionalFormInfo) {}
