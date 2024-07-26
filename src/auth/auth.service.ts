import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  payload: object;
  constructor (private readonly jwtService: JwtService) {}

  jwtDecode(auth: string) {
    const jwt = auth.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true })
  }

  setJWTDecode(payload: object) {
    this.payload = payload
  }

  getJWTDecode() {
    return this.payload
  }
}
