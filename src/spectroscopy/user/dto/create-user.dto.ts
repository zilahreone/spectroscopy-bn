import { IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsUUID } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsOptional()
  preferredUsername: string;

  @IsOptional()
  givenname: string;

  @IsOptional()
  familyname: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmptyObject()
  @IsNotEmpty()
  user: object;

  @IsUUID(4)
  @IsNotEmpty()
  organizationId: string;
}
