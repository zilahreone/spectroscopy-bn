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

export class CreateSampleDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  form: string;

  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  note: string;

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  attachments: Files[]
  
  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  images: Files[];

  @IsUUID(4)
  @IsNotEmpty()
  material_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  category_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  organization_id: string;
}

export class AdditionalSampleInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
