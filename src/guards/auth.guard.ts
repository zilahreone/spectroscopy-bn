import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginTicket, OAuth2Client } from "google-auth-library";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    if (type !== 'Bearer') {
      throw new UnauthorizedException();
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    }).then((resp: LoginTicket) => {
      console.log(new Date(resp.getPayload().exp * 1000).toLocaleTimeString())
      return resp.getPayload()
    }).catch(err => {
      return undefined
    })
    if (!ticket) {
      throw new UnauthorizedException();
    }
    console.log(ticket);
    
    
    
    // try {
    //   tokenInfo
    // } catch (error) {
    //   console.log('asdfsdaf');
    // }
    return true
  }
}