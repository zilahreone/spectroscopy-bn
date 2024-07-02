import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateExperimentDto, Data } from './create-experiment.dto';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFiles, MaxFileSize } from 'nestjs-form-data';
import { Transform, Type, plainToClass } from 'class-transformer';

class AdditionalExperiment {
  @IsDefined()
  id: string

  // @IsDefined()
  // modified_by: string

  // @IsDefined()
  // modified_at: string
}

class DataUpdate extends IntersectionType(
  Data,
  AdditionalExperiment
) {}

export class UpdateExperimentDto {
  @MaxFileSize(1 * 1024 * 1024, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  @IsFiles({ each: true })
  @IsOptional()
  files: FileSystemStoredFile[];

  @ValidateNested()
  @Transform(({ value }) => plainToClass(DataUpdate, JSON.parse(value)))
  @Type(() => DataUpdate)
  @IsDefined()
  data: DataUpdate
}
