import { IsBoolean, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsUUID } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsOptional()
  preferred_username: string;

  @IsOptional()
  given_name: string;

  @IsOptional()
  family_name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmptyObject()
  @IsNotEmpty()
  user: object;

  @IsUUID(4)
  @IsNotEmpty()
  organization_id: string;
}
