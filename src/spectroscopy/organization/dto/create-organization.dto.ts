import { IsDefined, IsOptional } from "class-validator";

export class CreateOrganizationDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  contact: string;
}

export class AdditionalOrganizationInfo {
  @IsDefined()
  id: string;
}
