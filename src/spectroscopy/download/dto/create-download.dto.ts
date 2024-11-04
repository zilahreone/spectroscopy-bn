import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateDownloadDto {
  @IsNotEmpty()
  measurement_id: string;
  
  @IsNotEmpty()
  @IsOptional()
  user_id: string;
}

export class AdditionalCreateDownloadInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
