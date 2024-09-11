import { IntersectionType, OmitType } from "@nestjs/swagger";
import { Transform, Type, plainToClass } from "class-transformer"
import { IsDefined, IsEmail, IsOptional, ValidateNested } from "class-validator"
import { FileSystemStoredFile, HasMimeType, IsFile, IsFiles, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { UploadFile } from "../files.decorator";

class User {
  @IsDefined()
  id: string

  @IsOptional()
  name: string

  @IsDefined()
  preferred_username: string

  @IsOptional()
  given_name: string

  @IsOptional()
  family_name: string

  @IsEmail()
  @IsDefined()
  email: string
}

class Files {
  @IsDefined()
  name: string

  @IsOptional()
  path: string

  @IsDefined()
  size: number

  @IsOptional()
  mime_type: string

  @IsOptional()
  file_ext: string
}

class Data {

  @IsDefined()
  experiment_name: string;

  @IsDefined()
  chemical_name: string;
  
  @IsOptional()
  chemical_id: string;

  @IsDefined()
  date_collection: string;

  @IsDefined()
  measurement_technique: string;

  @IsDefined()
  organization: string;

  @IsDefined()
  collected_by: string;

  @IsDefined()
  instrument: string;

  @IsDefined()
  type: string;

  @IsDefined()
  normalization: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  created_by: User;

  @IsOptional()
  created_at: string

  @ValidateNested()
  @Type(() => Files)
  @IsDefined()
  files: Files[]

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  others_attachments: Files[]

}

class AdditionalData {
  @IsDefined()
  id: string

  // @IsDefined()
  // modified_by: string

  // @IsDefined()
  // modified_at: string
}


class UpdateData extends IntersectionType(
  Data,
  AdditionalData
) {}

class DataCreate {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  @Type(() => Data)
  @IsDefined()
  data: Data
}

export class DataUpdate {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  @Type(() => UpdateData)
  @IsDefined()
  data: UpdateData
}

class File {
  @MaxFileSize(1 * 1024 * 1024, { each: true })
  @HasMimeType(['application/octet-stream'], { each: true })
  @IsFiles({ each: true })
  @IsDefined()
  @Transform(({ value }: { value: MemoryStoredFile[] }) => {
    value.forEach((file) => {
      if (file) {
        // console.log(file);
        if (!/[^\u0000-\u00ff]/.test(file.originalName)) {
          file.originalName = Buffer.from(file.originalName, 'latin1').toString('utf8')
        }
      }
    })
    return value
  })
  files: FileSystemStoredFile;

  @MaxFileSize(10 * 1024 * 1024, { each: true })
  @HasMimeType(['application/pdf'], { each: true })
  @IsFiles({ each: true })
  @IsOptional()
  @Transform(({ value }: { value: MemoryStoredFile[] }) => {
    value.forEach((file) => {
      if (file) {
        // console.log(file);
        if (!/[^\u0000-\u00ff]/.test(file.originalName)) {
          file.originalName = Buffer.from(file.originalName, 'latin1').toString('utf8')
        }
      }
    })
    return value
  })
  others_attachments: MemoryStoredFile;
}

export class FileUpdate extends OmitType(File, ['files']) {}

export class CreateExperimentDto extends IntersectionType(
  File,
  DataCreate
) {}