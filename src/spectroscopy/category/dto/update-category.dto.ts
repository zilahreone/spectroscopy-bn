import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AdditionalCreateCategoryInfo, CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends IntersectionType(CreateCategoryDto, AdditionalCreateCategoryInfo) {}
