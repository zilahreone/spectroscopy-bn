import { IntersectionType } from "@nestjs/swagger";
import { Transform, Type, plainToClass } from "class-transformer"
import { IsDefined, ValidateNested } from "class-validator"
import { FileSystemStoredFile, HasMimeType, IsFile, IsFiles, MaxFileSize } from "nestjs-form-data";

class User {
  @IsDefined()
  id: string

  @IsDefined()
  name: string
}

export class Data {

  @IsDefined()
  experiment_name: string;

  @IsDefined()
  chemical_name: string;

  // @IsDefined()
  date_collection: string;

  // @IsDefined()
  measurement_technique: string;

  // @IsDefined()
  organization: string;

  // @IsDefined()
  collected_by: string;

  // @IsDefined()
  instrument: string;

  // @IsDefined()
  type: string;

  // @IsDefined()
  normalization: string;

  // @IsDefined()
  created_by: User;

  // @IsDefined()
  created_at: string

}

class AdditionalExperimentDto {
  @IsDefined()
  id: string
}

class UpdateData extends IntersectionType(Data, AdditionalExperimentDto) {}

export class CreateExperimentDto {
  // // @IsDefined()
  // file: any

  // @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  // // @Type(() => Data)
  // @ValidateNested()
  // @IsDefined()
  // data: Data
  @IsFiles()
  @MaxFileSize(1 * 1024 * 1024, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  files: FileSystemStoredFile[];
}

export class UpdateCreateExperimentDto {
  // @IsDefined()
  file: any

  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  // @Type(() => UpdateData)
  @ValidateNested()
  @IsDefined()
  data: UpdateData

}
