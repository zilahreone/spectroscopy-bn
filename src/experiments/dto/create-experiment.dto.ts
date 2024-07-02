import { IntersectionType } from "@nestjs/swagger";
import { Transform, Type, plainToClass } from "class-transformer"
import { IsDefined, IsOptional, ValidateNested } from "class-validator"
import { FileSystemStoredFile, HasMimeType, IsFile, IsFiles, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { UploadFile } from "../files.decorator";

class User {
  @IsDefined()
  id: string

  @IsDefined()
  name: string
}

class Files {
  @IsDefined()
  file_name: string
  @IsDefined()
  path: string
  @IsDefined()
  mime_type: string
  @IsDefined()
  file_ext: string
}

export class Data {

  @IsDefined()
  experiment_name: string;

  @IsDefined()
  chemical_name: string;

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

  // @IsDefined()
  @ValidateNested()
  @Type(() => User)
  created_by: User;

  // @IsDefined()
  created_at: string

  @ValidateNested()
  @Type(() => Files)
  // @IsDefined()
  files: Files[]

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  others_attachments: Files[]

}

// export class CreateExperimentDtoOld {
//   @ValidateNested()
//   @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
//   @Type(() => Data)
//   @IsDefined()
//   data: Data
// }

export class CreateExperimentDto {
  @MaxFileSize(1 * 1024 * 1024, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  @IsFiles({ each: true })
  @IsOptional()
  @Transform(({ value }: { value: MemoryStoredFile[] }) => {
    // console.log(value);
    value.forEach((file) => {
      if (!/[^\u0000-\u00ff]/.test(file.originalName)) {
        file.originalName = Buffer.from(file.originalName, 'latin1').toString('utf8')
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
    // console.log(value);
    value.forEach((file) => {
      if (!/[^\u0000-\u00ff]/.test(file.originalName)) {
        file.originalName = Buffer.from(file.originalName, 'latin1').toString('utf8')
      }
    })
    return value
  })
  others_attachments: MemoryStoredFile;

  @ValidateNested()
  @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  @Type(() => Data)
  // @IsDefined()
  data: Data
}