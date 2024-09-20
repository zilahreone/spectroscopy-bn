import { IsDefined, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalCreateCategoryInfo {
  @IsDefined()
  id: string;
}
