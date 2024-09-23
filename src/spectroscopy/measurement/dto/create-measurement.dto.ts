import { Type } from "class-transformer";
import { IsDefined, IsOptional, ValidateNested } from "class-validator";

class Files {
  @IsDefined()
  name: string

  // @IsOptional()
  // path: string

  @IsDefined()
  size: number

  @IsOptional()
  mime_type: string

  @IsOptional()
  file_ext: string
}

export class CreateMeasurementDto {
  @IsDefined()
  parameters: string;

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  files: Files[]

}

export class AdditionalMeasurementInfo {
  @IsDefined()
  id: string;
}
