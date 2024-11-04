import { IsDefined, IsNotEmpty, IsUUID } from "class-validator";

export class CreateExperimentDto {
  @IsDefined()
  experiment_name: string;

  @IsDefined()
  material_name: string;

  @IsDefined()
  instrument: string;

  @IsUUID(4)
  @IsNotEmpty()
  user_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  sample_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  organization_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  technique_id: string;

  @IsUUID(4)
  @IsNotEmpty()
  measurement_id: string;

}

export class AdditionalExperimentInfo {
  @IsNotEmpty()
  id: string;
}
