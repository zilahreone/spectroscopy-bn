import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";

class Files {
  @IsNotEmpty()
  name: string

  // @IsOptional()
  // path: string

  @IsNotEmpty()
  size: number

  @IsOptional()
  mime_type: string

  @IsOptional()
  file_ext: string
}

export class CreateMeasurementDto {
  @IsNotEmpty()
  parameters: string;

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  files: Files[]

}

export class AdditionalMeasurementInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
