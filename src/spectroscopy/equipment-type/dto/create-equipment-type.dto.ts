import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateEquipmentTypeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}

export class AdditionalEquipmentTypeInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
