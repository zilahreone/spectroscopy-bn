import { IsDefined, IsOptional } from "class-validator";

export class CreateTechniqueDto {
  @IsDefined()
  name: string;

  @IsDefined()
  description: string;
}

export class AdditionalTechniqueInfo {
  @IsDefined()
  id: string;
}
