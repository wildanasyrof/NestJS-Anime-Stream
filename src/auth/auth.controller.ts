import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WebResponse } from 'src/model/web.model';
import { CreateUserRequest, User } from 'src/model/user.model';
import { LoginRequest } from 'src/model/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() request: CreateUserRequest,
  ): Promise<WebResponse<{ accessToken: string }>> {
    const result = await this.authService.register(request);
    return {
      status: 'success',
      message: 'Register success',
      data: result,
    };
  }

  @Post('login')
  async login(
    @Body() request: LoginRequest,
  ): Promise<WebResponse<{ accessToken: string }>> {
    const result = await this.authService.login(request);
    return {
      status: 'success',
      message: 'login success',
      data: result,
    };
  }
}
