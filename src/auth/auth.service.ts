import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from 'src/model/auth.model';
import { CreateUserRequest, User, UserResponse } from 'src/model/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(request: CreateUserRequest): Promise<AuthResponse> {
    const user = await this.userService.create(request);

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      user: user,
    };
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const user = await this.userService.login(request);

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      user: user,
    };
  }
}
