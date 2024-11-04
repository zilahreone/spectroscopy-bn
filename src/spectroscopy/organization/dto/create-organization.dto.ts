import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateOrganizationDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  contact: string;
}

export class AdditionalOrganizationInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
