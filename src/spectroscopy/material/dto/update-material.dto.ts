import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalCreateMaterialInfo, CreateMaterialDto } from './create-material.dto';

export class UpdateMaterialDto extends IntersectionType(CreateMaterialDto, AdditionalCreateMaterialInfo) {}
