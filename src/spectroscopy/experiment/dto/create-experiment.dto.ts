import { IsDefined, IsNotEmpty, IsUUID } from "class-validator";

export class CreateExperimentDto {
  @IsDefined()
  name: string;

  @IsDefined()
  chemicalName: string;
  
  @IsDefined()
  chemicalId: string;

  @IsDefined()
  instrumentName: string;
  
  @IsDefined()
  instrumentId: string;

  @IsUUID(4)
  @IsNotEmpty()
  userId: string;

  @IsUUID(4)
  @IsNotEmpty()
  sampleId: string;

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
  measurementId: string;
  
  @IsNotEmpty()
  measurementName: string;

}

export class AdditionalExperimentInfo {
  @IsNotEmpty()
  id: string;
}
