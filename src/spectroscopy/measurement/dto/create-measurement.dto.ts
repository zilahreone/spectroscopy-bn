import { IsDefined, IsOptional } from "class-validator";

export class CreateMeasurementDto {
  id: string;

  @IsDefined()
  name: string;

  @IsOptional()
  description: string;

  @IsDefined()
  instrument: string;

}
