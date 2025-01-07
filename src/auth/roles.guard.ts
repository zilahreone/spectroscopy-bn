import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string[]) {
    return roles.some(role => userRoles.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    
    if (!roles || Object.keys(roles).length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    const user = request.user;
    return this.matchRoles(roles, user.realm_access?.roles);
  }
}