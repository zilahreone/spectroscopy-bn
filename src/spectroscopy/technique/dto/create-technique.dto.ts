import { IsDefined, IsOptional } from "class-validator";

export class CreateTechniqueDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}
