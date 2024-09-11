import { Type } from "class-transformer";
import { IsDefined, IsInt, IsNumber, ValidateNested } from "class-validator";
import { CreateMeasurementDto } from "src/spectroscopy/measurement/dto/create-measurement.dto";
import { CreateUserDto } from "src/spectroscopy/user/dto/create-user.dto";

export class CreateDownloadDto {

  @IsNumber()
  timestamp: number;
  
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateMeasurementDto)
  measurement: CreateMeasurementDto

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto

}
