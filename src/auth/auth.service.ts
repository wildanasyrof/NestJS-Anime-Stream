import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequest } from 'src/model/auth.model';
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

  async register(request: CreateUserRequest): Promise<User> {
    return this.userService.create(request);
  }
}
