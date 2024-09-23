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

export class CreateSampleDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;

  @IsDefined()
  form: string;

  @IsDefined()
  source: string;

  @IsDefined()
  note: string;

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  attachments: Files[]
  
  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  images: Files[];
}

export class AdditionalSampleInfo {
  @IsDefined()
  id: string;
}
