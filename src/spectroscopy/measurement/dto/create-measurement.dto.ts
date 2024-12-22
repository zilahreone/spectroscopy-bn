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


class MeasurementTechniqueSERS {
  @IsOptional()
  chip: string;

  @IsOptional()
  nanoparticles: string;

  @IsOptional()
  papers: string;

  @IsOptional()
  other: string;
}

class MeasurementTechnique {
  @ValidateNested()
  @Type(() => MeasurementTechniqueSERS)
  @IsNotEmptyObject()
  sers: MeasurementTechniqueSERS
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

  @IsNotEmpty()
  @ValidateIf((measurement: Data) => measurement.techniqueName === 'tds')
  binder: string;

  @Type((val) => {
    const { techniqueName } = val.newObject

    switch (techniqueName) {
      case 'raman':
        return RamanCondition;
      case 'ftir':
        return FTIRCondition;
      case 'tds':
        return TDSCondition;
      default:
        break;
    }
  })
  @ValidateNested()
  @IsNotEmptyObject()
  measurementCondition: RamanCondition | FTIRCondition | TDSCondition;

  @ValidateNested()
  @Type((val) => {
    const { techniqueName } = val.newObject
    switch (techniqueName) {
      case 'raman':
        return MeasurementTechnique
      default:
        break;
    }
  })
  @IsNotEmpty()
  @ValidateIf((measurement: Data) => ['ftir', 'raman'].includes(measurement.techniqueName))
  measurementTechnique: string | MeasurementTechnique;

  @IsNotEmpty()
  @ValidateIf((measurement: Data) => measurement.techniqueName === 'ftir')
  measurementRange: string;

  @IsNotEmpty()
  @ValidateIf((measurement: Data) => measurement.techniqueName === 'raman')
  typeData: string;

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