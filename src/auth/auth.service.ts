import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, RegisterRequest } from 'src/model/auth.model';
import { CreateUserRequest, User } from 'src/model/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserById(id: string): Promise<User> {
    return this.userService.findById(id);
  }

  async register(request: CreateUserRequest): Promise<{ accessToken: string }> {
    const user = await this.userService.create(request);

    const payload = { id: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async login(request: LoginRequest): Promise<{ accessToken: string }> {
    const user = await this.userService.login(request);

    const payload = { id: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
