import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalCreateCategoryInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
