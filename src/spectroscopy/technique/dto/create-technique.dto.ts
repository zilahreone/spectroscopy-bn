import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateTechniqueDto {
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  description: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  categoryId: string;
  
  @IsNotEmpty()
  categoryName: string;
}

export class AdditionalTechniqueInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
