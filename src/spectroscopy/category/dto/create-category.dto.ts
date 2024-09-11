import { IsDefined, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}
