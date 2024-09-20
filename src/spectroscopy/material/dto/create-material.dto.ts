import { IsDefined, IsOptional } from "class-validator";

export class CreateMaterialDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalCreateMaterialInfo {
  @IsDefined()
  id: string;
}
