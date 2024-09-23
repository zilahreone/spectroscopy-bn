import { IsDefined } from "class-validator";

export class CreateExperimentDto {
  @IsDefined()
  experiment_name: string;

  @IsDefined()
  material_name: string;
  
  @IsDefined()
  instrument: string;
  
}

export class AdditionalExperimentInfo {
  @IsDefined()
  id: string;
}
