import { IntersectionType } from "@nestjs/swagger";
import { plainToClass, Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFiles, MaxFileSize } from "nestjs-form-data";

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

class MeasurementCondition {
  @IsNumber()
  @IsNotEmpty()
  accumulations: number;

  @ValidateIf((measurement: Data) => ['tds', 'raman'].includes(measurement.experimentName))
  wavelength: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'ftir')
  source: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'ftir')
  beamSplitter: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'ftir')
  detector: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'raman')
  laserPower: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'raman')
  exposureTime: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'raman')
  lens: string;
}

class MeasurementTechniqueSERS {
  @IsNotEmpty()
  chip: string;
  @IsNotEmpty()
  nanoparticles: string;
  @IsNotEmpty()
  papers: string;
  @IsNotEmpty()
  other: string;
}

class MeasurementTechnique {
  @ValidateNested()
  @Type(() => MeasurementTechniqueSERS)
  @IsNotEmptyObject()
  sers: MeasurementTechniqueSERS
}

class Data {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  experimentName: string;

  @IsNotEmpty()
  instrument: string;

  @IsOptional()
  spectrumDescription: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'tds')
  binder: string;

  @ValidateNested()
  @Type(() => MeasurementCondition)
  @IsNotEmptyObject()
  measurementCondition: MeasurementCondition;

  @ValidateNested()
  @Type(() => MeasurementTechnique)
  @ValidateIf((measurement: Data) => ['ftir', 'raman'].includes(measurement.experimentName))
  measurementTechnique: string | MeasurementTechnique;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'ftir')
  measurementRange: string;

  @ValidateIf((measurement: Data) => measurement.experimentName === 'raman')
  typeData: string;

  @ValidateNested()
  @Type(() => Files)
  @IsOptional()
  files: Files[]
}

export class FileDto {
  @IsFiles()
  @MaxFileSize(7 * 1024 * 1024, { message: 'Maximum file size is 7 MB' })
  @HasMimeType(['application/pdf', 'text/plain'])
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

export class AdditionalMeasurementInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}

class UpdateData extends IntersectionType(
  Data,
  AdditionalMeasurementInfo
) {}

export class UpdateDataDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  @Type(() => UpdateData)
  @IsDefined()
  data: UpdateData
}

export class CreateMeasurementDto extends IntersectionType(
  FileDto,
  CreateDataDto
) { }