import { IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsUUID } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  preferredUsername: string;

  @IsNotEmpty()
  givenName: string;

  @IsNotEmpty()
  familyName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmptyObject()
  @IsNotEmpty()
  user: object;

  @IsUUID(4)
  @IsOptional()
  organizationId: string;
}
