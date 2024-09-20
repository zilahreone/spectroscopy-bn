import { IntersectionType } from '@nestjs/swagger';
import { AdditionalOrganizationInfo, CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends IntersectionType(CreateOrganizationDto, AdditionalOrganizationInfo) {}
