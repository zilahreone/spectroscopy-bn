import { ValidationOptions, ValidatorConstraintInterface, registerDecorator } from "class-validator";

class CustomCheckFile implements ValidatorConstraintInterface {
  // constructor(private readonly prisma: PrismaService) {}

  async validate(value: string): Promise<boolean> {
    console.log(value);
    return false
  }
}

export function UploadFile(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomCheckFile,
    });
  };
}