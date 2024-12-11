import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInstrumentDto {
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  description: string;

  @IsUUID(4)
  @IsNotEmpty()
  techniqueId: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  equipmentTypeId: string;
}

export class AdditionalInstrumentInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
