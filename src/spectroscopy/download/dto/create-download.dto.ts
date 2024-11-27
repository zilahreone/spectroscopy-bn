import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateDownloadDto {
  @IsNotEmpty()
  measurementId: string;
  
  @IsNotEmpty()
  @IsOptional()
  userId: string;
}

export class AdditionalCreateDownloadInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
