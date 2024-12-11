import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateFormDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalFormInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
