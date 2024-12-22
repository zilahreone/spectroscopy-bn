import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ParamDecode = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(ctx);
    
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);