import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalCreateChemicalInfo, CreateChemicalDto } from './create-chemical.dto';

export class UpdateChemicalDto extends IntersectionType(CreateChemicalDto, AdditionalCreateChemicalInfo) {}
