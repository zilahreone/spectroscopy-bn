import { IntersectionType, PartialType } from "@nestjs/swagger";
import { plainToClass, Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, IsFiles, MaxFileSize } from "nestjs-form-data";
import { join } from "path";

function checkUnicode(files: FileSystemStoredFile[]): FileSystemStoredFile[] {
  let attachments = files
  attachments.forEach(file => {
    if (!/[^\u0000-\u00ff]/.test(file?.originalName)) {
      const name = Buffer.from(file.originalName, 'latin1').toString('utf8')
      file.originalName = name
    }
  })
  // console.log(attachments);
  return attachments
}

class Files {
  @IsNotEmpty()
  name: string

  // @IsOptional()
  // path: string

  @IsNotEmpty()
  size: number

  @IsOptional()
  mimeType: string

  @IsOptional()
  fileExt: string
}

class Data {
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
  chemicalId: string;
  
  @IsNotEmpty()
  chemicalName: string;

  @IsUUID(4)
  @IsNotEmpty()
  categoryId: string;
  
  @IsNotEmpty()
  categoryName: string;

  @IsUUID(4)
  @IsNotEmpty()
  organizationId: string;
  
  @IsNotEmpty()
  organizationName: string;
}

class AdditionalSampleInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}

class UpdateData extends IntersectionType(
  Data,
  AdditionalSampleInfo
) {}


export class FileDto {
  @IsFiles({ each: true })
  @MaxFileSize(7 * 1024 * 1024, { each: true, message: 'Maximum file size is 7 MB' })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  @Transform(({ value }: { value: FileSystemStoredFile[] }) => checkUnicode(value))
  @IsOptional()
  images: FileSystemStoredFile;
  
  @IsFiles({ each: true })
  @MaxFileSize(7 * 1024 * 1024, { each: true, message: 'Maximum file size is 7 MB' })
  @HasMimeType(['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'], { each: true })
  @Transform(({ value }: { value: FileSystemStoredFile[] }) => checkUnicode(value))
  @IsOptional()
  attachments: FileSystemStoredFile;
}

class CreateDataDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  @Type(() => Data)
  @IsDefined()
  data: Data
}

export class UpdateDataDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  @Type(() => UpdateData)
  @IsDefined()
  data: UpdateData
}

export class CreateSampleDto extends IntersectionType(
  FileDto,
  CreateDataDto
) {}