import { IsDefined, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateDownloadDto {
  @IsUUID(4)
  @IsNotEmpty()
  experimentId: string;
  
  @IsUUID(4)
  @IsNotEmpty()
  userId: string;
}

export class AdditionalCreateDownloadInfo {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
