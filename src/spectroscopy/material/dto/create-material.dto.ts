import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateMaterialDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalCreateMaterialInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
