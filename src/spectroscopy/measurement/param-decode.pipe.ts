import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
// export class ParamDecodePipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     console.log(value);
//     console.log(metadata);

//     if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9]*$/)) {
//       throw new BadRequestException('Invalid parameter format');
//     }
//     return value;
//   }
// }

export class ParamDecodePipe implements PipeTransform {
  transform(value: any) {
    console.log(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return null;
  }
}