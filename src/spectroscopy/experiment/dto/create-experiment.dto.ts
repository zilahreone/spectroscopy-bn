import { IsDefined } from "class-validator";

export class CreateExperimentDto {
  id: string;

  @IsDefined()
  experiment_name: string;

  @IsDefined()
  chemical_name: string;

  
}
