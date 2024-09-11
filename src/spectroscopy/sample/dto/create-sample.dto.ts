import { IsDefined, IsOptional } from "class-validator";

export class CreateSampleDto {
  @IsDefined()
  name: string;

  @IsOptional()
  description: string;
}
