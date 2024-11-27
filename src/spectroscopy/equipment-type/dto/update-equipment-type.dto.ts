import { IntersectionType } from '@nestjs/swagger';
import { AdditionalEquipmentTypeInfo, CreateEquipmentTypeDto } from './create-equipment-type.dto';

export class UpdateEquipmentTypeDto extends IntersectionType(CreateEquipmentTypeDto, AdditionalEquipmentTypeInfo) {}
