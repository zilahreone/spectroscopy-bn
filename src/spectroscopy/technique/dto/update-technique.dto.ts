import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalTechniqueInfo, CreateTechniqueDto } from './create-technique.dto';

export class UpdateTechniqueDto extends IntersectionType(CreateTechniqueDto, AdditionalTechniqueInfo) {}
