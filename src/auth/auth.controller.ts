import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WebResponse } from 'src/model/web.model';
import { CreateUserRequest, User } from 'src/model/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() request: CreateUserRequest,
  ): Promise<WebResponse<User>> {
    const result = await this.authService.register(request);
    return {
      status: 'success',
      message: 'User registered successfully',
      data: result,
    };
  }
}
