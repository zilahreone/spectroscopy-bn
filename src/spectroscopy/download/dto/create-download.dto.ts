import { IsDefined } from "class-validator";

export class CreateDownloadDto {
  
  // @IsDefined()
  // @ValidateNested()
  // @Type(() => CreateMeasurementDto)
  // measurement: CreateMeasurementDto

  // @IsDefined()
  // @ValidateNested()
  // @Type(() => CreateUserDto)
  // user: CreateUserDto

}

export class AdditionalCreateDownloadInfo {
  @IsDefined()
  id: string;
}
