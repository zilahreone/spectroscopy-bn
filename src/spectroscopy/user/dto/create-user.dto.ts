import { IsBoolean, IsDefined, IsEmail, IsNotEmptyObject, IsObject, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsDefined()
  id: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  // @IsDefined()
  // organization_id: string;

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
  @IsObject()
  @IsDefined()
  user: object;
}
