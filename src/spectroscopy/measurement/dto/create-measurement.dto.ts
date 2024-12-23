import { IntersectionType } from "@nestjs/swagger";
import { plainToClass, Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFiles, MaxFileSize } from "nestjs-form-data";

function checkUnicode(files: FileSystemStoredFile[]): FileSystemStoredFile[] {
  // console.log(files);
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

export class MeasurementCondition {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  accumulations: number;

}

class TDSCondition extends MeasurementCondition {
  @IsNotEmpty()
  @ValidateIf((_, val) => !new RegExp(/^[1-9]\d*nm$/g).test(val))
  waveLength: string;
}

class FTIRCondition extends MeasurementCondition {
  @IsNotEmpty()
  source: string;

  @IsNotEmpty()
  beamSplitter: string;

  @IsNotEmpty()
  detector: string;
}

class RamanCondition extends MeasurementCondition {

  // @IsNumber()
  // @IsNotEmpty()
  // accumulations: number;
  
  @IsNotEmpty()
  @ValidateIf((_, val) => !new RegExp(/^[1-9]\d*nm$/g).test(val))
  waveLength: string;

  @IsNotEmpty()
  @ValidateIf((_, val) => !new RegExp(/^[1-9]\d*%$/g).test(val))
  laserPower: string;

  @IsNotEmpty()
  @ValidateIf((_, val) => !new RegExp(/^[1-9]\d*s$/g).test(val))
  exposureTime: string;

  @IsNotEmpty()
  @ValidateIf((_, val) => !new RegExp(/^[1-9]\d*x$/g).test(val))
  lens: string;

}


class RamanMeasurementTechniqueSERS {
  @IsOptional()
  chip: string;

  @IsOptional()
  nanoparticles: string;

  @IsOptional()
  papers: string;

  @IsOptional()
  other: string;
}

class RamanMeasurementTechnique {

  @ValidateNested()
  @Type(() => RamanMeasurementTechniqueSERS)
  @IsNotEmptyObject()
  sers: RamanMeasurementTechniqueSERS
}

class TDSSignal {

  @IsNotEmpty()
  binder: string;

  @ValidateNested()
  @Type(() => TDSCondition)
  @IsNotEmptyObject()
  measurementCondition: TDSCondition;
}

class FTIRSignal {

  @ValidateNested()
  @Type(() => FTIRCondition)
  @IsNotEmptyObject()
  measurementCondition: FTIRCondition;

  @IsNotEmpty()
  measurementTechnique: string;

  @IsNotEmpty()
  measurementRange: string;
}

class RamanSignal {

  @ValidateNested()
  @Type(() => RamanCondition)
  @IsNotEmptyObject()
  measurementCondition: RamanCondition;

  @ValidateNested()
  @Type(() => RamanMeasurementTechnique)
  @IsNotEmptyObject()
  measurementTechnique: RamanMeasurementTechnique;

  @IsNotEmpty()
  typeData: string;
  
}

export class Data {
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsNotEmpty()
  experimentId: string;

  @IsNotEmpty()
  experimentName: string;

  @IsUUID(4)
  @IsNotEmpty()
  instrumentId: string;

  @IsNotEmpty()
  instrumentName: string;

  @IsOptional()
  spectrumDescription: string;

  @IsOptional()
  remark: string;

  @IsNotEmpty()
  techniqueName: string;

  
  @ValidateNested()
  @Type((val) => {
    const { techniqueName } = val.newObject
    switch (techniqueName) {
      case 'raman':
        return RamanSignal;
      case 'ftir':
        return;
      case 'tds':
        return;
      default:
        break;
    }
  })
  @IsNotEmptyObject()
  signal: RamanSignal | FTIRSignal | TDSSignal

  @ValidateNested()
  @Type(() => Files)
  @IsNotEmptyObject()
  attachment: Files

}

export class FileDto {
  @IsFiles()
  @MaxFileSize(7 * 1024 * 1024, { message: 'Maximum file size is 7 MB', each: true })
  @HasMimeType('text/plain', { each: true })
  @Transform(({ value }: { value: FileSystemStoredFile[] }) => checkUnicode(value))
  @IsNotEmpty()
  attachment: FileSystemStoredFile;
}

class CreateDataDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  @Type(() => Data)
  @IsNotEmpty()
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
) { }

export class UpdateDataDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  @Type(() => UpdateData)
  @IsNotEmpty()
  data: UpdateData
}

export class CreateMeasurementDto extends IntersectionType(
  FileDto,
  CreateDataDto
) { }