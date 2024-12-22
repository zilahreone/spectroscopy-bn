import { IntersectionType } from "@nestjs/swagger";
import { plainToClass, Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

class Data {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  sampleName: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  sampleId: string;
  
  @IsNotEmpty()
  instrumentName: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  instrumentId: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  userId: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  organizationId: string;
  
  @IsNotEmpty()
  organizationName: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  techniqueId: string;
  
  @IsNotEmpty()
  techniqueName: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  equipmentId: string;
  
  @IsNotEmpty()
  equipmentName: string;
}

export class AdditionalExperimentInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}

export class UpdateData extends IntersectionType(
  Data,
  AdditionalExperimentInfo
) {}

export class CreateExperimentDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(Data, JSON.parse(value)))
  @Type(() => Data)
  @IsDefined()
  data: Data
}

export class UpdateDataExperimentDto {
  @ValidateNested()
  @Transform(({ value }) => plainToClass(UpdateData, JSON.parse(value)))
  @Type(() => UpdateData)
  @IsDefined()
  data: UpdateData
}