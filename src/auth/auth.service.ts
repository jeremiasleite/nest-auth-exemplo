import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private readonly jwtService: JwtService,
      ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload), user: user
    };
  }
}
