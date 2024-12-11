import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateChemicalDto {
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  description: string;
}

export class AdditionalCreateChemicalInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
