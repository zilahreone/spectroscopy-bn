import { Type } from "class-transformer";
import { IsDefined, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/spectroscopy/user/dto/create-user.dto";

export class CreateOrganizationDto {
  @IsDefined()
  name: string;

  @IsDefined()
  description: string;

  // @IsDefined()
  // @ValidateNested()
  // @Type(() => CreateUserDto)
  // user: CreateUserDto;
}
