import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateTechniqueDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalTechniqueInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
