import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // console.log(user);
    // console.log((request.originalUrl));
    const slashCount = (request.originalUrl.match(/\//g) || []).length;
    // console.log(`Number of slashes in URL: ${slashCount}`);
    
    if (request.method === 'GET') {
      return true;
    }
    
    const result = await super.canActivate(context);
    console.log(result);
    return result as boolean;
  }
  // constructor(private reflector: Reflector) {
  //   super();
  // }
  // canActivate(context: ExecutionContext): boolean {
  //   return true
  //   const request = context.switchToHttp().getRequest();
  //   const method = request.method;
    
  //   console.log(Object.keys(request));
  //   console.log(request.rawHeaders);
  //   if (method !== 'GET') return false;
  //   return true; // or your logic to determine if the request is allowed
  // }
}