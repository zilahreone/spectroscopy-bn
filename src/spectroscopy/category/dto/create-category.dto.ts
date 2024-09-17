import { IsDefined, IsOptional } from "class-validator";

export class CreateCategoryDto {
  id: string;

  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}
