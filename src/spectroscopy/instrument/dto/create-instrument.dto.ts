import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInstrumentDto {
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  description: string;

  @IsNotEmpty()
  techniqueId: string;
  
  @IsNotEmpty()
  equipmentTypeId: string;
}

export class AdditionalInstrumentInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
